import { makeConfig } from '@tests/helpers';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createCooldown, initPoint, parseAmount } from '@/commands/point';

const { mockTrigger, mockClientOn, MockCommand, MockButton } = vi.hoisted(
  () => ({
    mockTrigger: vi.fn(),
    mockClientOn: vi.fn(),
    MockCommand: vi.fn(),
    MockButton: vi.fn(),
  })
);

vi.mock('@/star', () => ({ trigger: mockTrigger, resetTotal: vi.fn() }));
vi.mock('@/client', () => ({ default: { on: mockClientOn } }));
vi.mock('@tixyel/streamelements', () => ({
  default: { actions: { Command: MockCommand, Button: MockButton } },
}));

// the show-total command is on by default, its own tests turn it back on
function setup(config = makeConfig({ enableTotalCommand: false })) {
  type Handler = (provider: string, event: unknown) => void;
  initPoint(config);
  return mockClientOn.mock.calls.find(
    ([name]) => name === 'event'
  )?.[1] as Handler;
}

const redemption = (name: string) => ({
  listener: 'event',
  event: {
    type: 'channelPointsRedemption',
    data: { redemption: name, displayName: 'Fan' },
  },
});
const cheer = (amount: number) => ({
  listener: 'cheer-latest',
  event: { amount, name: 'fan', displayName: 'Fan' },
});

beforeEach(() => vi.clearAllMocks());

describe('chat command', () => {
  it('is moderator-only by default and open when set to everyone', () => {
    setup();
    expect(MockCommand.mock.calls[0][0]).toMatchObject({
      name: 'goodpuppy',
      permissions: ['broadcaster', 'moderator'],
    });
    setup(
      makeConfig({ commandPermission: 'everyone', enableTotalCommand: false })
    );
    expect(MockCommand.mock.calls[1][0]).toMatchObject({ permissions: true });
  });

  it('is not registered when disabled', () => {
    setup(makeConfig({ enableCommand: false, enableTotalCommand: false }));
    expect(MockCommand).not.toHaveBeenCalled();
  });

  it('takes an amount capped at the max, else the default', () => {
    expect(parseAmount(['5'], 1, 10)).toBe(5);
    expect(parseAmount(['@Puppy', '3'], 1, 10)).toBe(3);
    expect(parseAmount(['999'], 1, 10)).toBe(10);
    expect(parseAmount(['-4'], 1, 10)).toBe(4);
    expect(parseAmount(['0'], 1, 10)).toBe(1);
    expect(parseAmount([], 2, 10)).toBe(2);
  });

  it('registers every name from the list', () => {
    setup(
      makeConfig({
        commandNames: ['goodpuppy', 'gp'],
        enableTotalCommand: false,
      })
    );
    expect(
      MockCommand.mock.calls.map(
        ([options]) => (options as { name: string }).name
      )
    ).toEqual(['goodpuppy', 'gp']);
  });
});

describe('cooldown', () => {
  it('blocks the same person until it runs out, others are free', () => {
    const isReady = createCooldown(10);
    expect(isReady('Mod', 0)).toBe(true);
    expect(isReady('mod', 9999)).toBe(false);
    expect(isReady('Other', 9999)).toBe(true);
    expect(isReady('Mod', 10_000)).toBe(true);
  });

  it('is off at 0 seconds', () => {
    const isReady = createCooldown(0);
    expect(isReady('Mod', 0)).toBe(true);
    expect(isReady('Mod', 0)).toBe(true);
  });

  it('stops a repeated command from triggering again', () => {
    setup();
    const command = MockCommand.mock.calls[0][0] as {
      run: (commandArguments: string[], event: unknown) => void;
    };
    const event = { data: { event: { data: { displayName: 'Mod' } } } };
    command.run(['10'], event);
    command.run(['10'], event);
    expect(mockTrigger).toHaveBeenCalledOnce();
  });
});

describe('show total command', () => {
  it('shows the total without adding anything', () => {
    setup(makeConfig({ enableCommand: false }));
    const show = MockCommand.mock.calls[0][0] as {
      name: string;
      run: (commandArguments: string[], event: unknown) => void;
    };
    expect(show.name).toBe('goodpuppies');
    show.run(['5'], { data: { event: { data: { displayName: 'Mod' } } } });
    expect(mockTrigger).toHaveBeenCalledWith({ user: 'Mod', totalOnly: true });
  });

  it('is not registered when disabled', () => {
    setup(makeConfig({ enableCommand: false, enableTotalCommand: false }));
    expect(MockCommand).not.toHaveBeenCalled();
  });
});

describe('channel points', () => {
  it('triggers only on the exact reward name from twitch', () => {
    const handler = setup();
    handler('twitch', redemption('good puppy point'));
    handler('youtube', redemption('Good Puppy point'));
    expect(mockTrigger).not.toHaveBeenCalled();
    handler('twitch', redemption('Good Puppy point'));
    expect(mockTrigger).toHaveBeenCalledWith({
      user: 'Fan',
      isMinus: false,
      amount: 1,
    });
  });

  it('gives each reward its own points', () => {
    const handler = setup(
      makeConfig({
        rewards: new Map([
          ['Good Puppy point', 1],
          ['Super puppy', 5],
        ]),
      })
    );
    handler('twitch', redemption('Super puppy'));
    expect(mockTrigger).toHaveBeenCalledWith({
      user: 'Fan',
      isMinus: false,
      amount: 5,
    });
  });

  it('ignores redemptions when disabled', () => {
    setup(makeConfig({ enableReward: false }))(
      'twitch',
      redemption('Good Puppy point')
    );
    expect(mockTrigger).not.toHaveBeenCalled();
  });
});

describe('bits', () => {
  it('is off by default', () => {
    setup()('twitch', cheer(10_000));
    expect(mockTrigger).not.toHaveBeenCalled();
  });

  it('triggers from the minimum amount up', () => {
    const handler = setup(makeConfig({ enableBits: true, minBits: 100 }));
    handler('twitch', cheer(99));
    expect(mockTrigger).not.toHaveBeenCalled();
    handler('twitch', cheer(250));
    expect(mockTrigger).toHaveBeenCalledWith({
      user: 'Fan',
      isMinus: false,
      amount: 250,
    });
  });
});

describe('minus points', () => {
  it('are off by default', () => {
    setup()('twitch', redemption('Bad Puppy point'));
    expect(MockCommand).toHaveBeenCalledOnce();
    expect(mockTrigger).not.toHaveBeenCalled();
  });

  it('register their own command that triggers a minus play', () => {
    setup(makeConfig({ enableMinusCommand: true, maxMinusAmount: 3 }));
    const minus = MockCommand.mock.calls[1][0] as {
      name: string;
      run: (commandArguments: string[], event: unknown) => void;
    };
    expect(minus.name).toBe('badpuppy');
    minus.run(['@Puppy', '50'], {
      data: { event: { data: { displayName: 'Mod' } } },
    });
    expect(mockTrigger).toHaveBeenCalledWith({
      user: 'Mod',
      isMinus: true,
      amount: 3,
    });
  });

  it('trigger a minus play from their own reward', () => {
    setup(makeConfig({ enableMinusReward: true }))(
      'twitch',
      redemption('Bad Puppy point')
    );
    expect(mockTrigger).toHaveBeenCalledWith({
      user: 'Fan',
      isMinus: true,
      amount: 1,
    });
  });
});

describe('bits payload', () => {
  it('ignores a cheer-shaped payload under the generic "event" listener', () => {
    // SE sends cheers as "cheer-latest", so this lookalike must not count twice
    setup(makeConfig({ enableBits: true }))('twitch', {
      listener: 'event',
      event: { type: 'cheer', data: { amount: 500, displayName: 'Fan' } },
    });
    expect(mockTrigger).not.toHaveBeenCalled();
  });
});
