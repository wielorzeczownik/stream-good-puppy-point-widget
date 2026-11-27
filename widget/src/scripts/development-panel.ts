import '@styles/development-panel.scss';

import Tixyel from '@tixyel/streamelements';

import { COMMAND_PREFIX } from '@/commands/point';
import { applyConfig, resetTotal, trigger } from '@/star';
import type { Config } from '@/types';

type EmulatedEvent = Parameters<
  typeof Tixyel.Local.emulate.send<'onEventReceived'>
>[1];

function emulateCommand(command: string): void {
  Tixyel.Local.emulate.twitch.message({
    name: 'testuser',
    userId: 'testuser',
    message: `${COMMAND_PREFIX}${command}`,
    badges: ['broadcaster/1'],
  });
}

function emulateChannelPoints(rewardName: string): void {
  Tixyel.Local.emulate.send('onEventReceived', {
    provider: 'twitch',
    listener: 'event',
    event: {
      type: 'channelPointsRedemption',
      data: {
        amount: 1,
        quantity: 1,
        avatar: '',
        message: '',
        username: 'testuser',
        displayName: 'testuser',
        providerId: 'testuser',
        redemption: rewardName,
      },
    },
  } as unknown as EmulatedEvent);
}

function emulateBits(amount: number): void {
  Tixyel.Local.emulate.send('onEventReceived', {
    provider: 'twitch',
    listener: 'cheer-latest',
    event: { amount, name: 'testuser', displayName: 'testuser', type: 'cheer' },
  } as unknown as EmulatedEvent);
}

function bindInput(
  id: string,
  initial: string,
  onChange: (value: string) => void
): void {
  const input = document.getElementById(id) as HTMLInputElement | null;
  if (!input) return;
  input.value = initial;
  input.addEventListener('input', () => {
    onChange(input.value);
    applyConfig();
  });
}

export function initDevelopmentPanel(config: Config): void {
  bindInput(
    'development-star-text',
    config.starText.replaceAll('\n', String.raw`\n`),
    (value) => (config.starText = value.replaceAll(String.raw`\n`, '\n'))
  );
  bindInput(
    'development-total-text',
    config.totalText,
    (value) => (config.totalText = value)
  );
  bindInput('development-star-color', config.starColor, (value) => {
    config.starColor = value;
    config.smallStarColor = value;
  });
  bindInput(
    'development-text-color',
    config.textColor,
    (value) => (config.textColor = value)
  );
  bindInput(
    'development-image-url',
    config.customImageUrl,
    (value) => (config.customImageUrl = value)
  );

  const buttons: Record<string, () => void> = {
    'development-trigger-command': () =>
      emulateCommand(config.commandNames[0] ?? ''),
    'development-trigger-minus': () =>
      trigger({ user: 'testuser', isMinus: true }),
    'development-trigger-points': () =>
      emulateChannelPoints(config.rewards.keys().next().value ?? ''),
    'development-trigger-bits': () => {
      config.enableBits = true;
      emulateBits(config.minBits);
    },
    'development-reset': () => resetTotal(),
  };
  for (const [id, run] of Object.entries(buttons)) {
    document.getElementById(id)?.addEventListener('click', run);
  }
}
