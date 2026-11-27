import Tixyel from '@tixyel/streamelements';

import client from '@/client';
import { resetTotal, trigger } from '@/star';
import type { Config } from '@/types';

export const COMMAND_PREFIX = '!';

const MODERATORS = ['broadcaster', 'moderator'];

const NUMBER = /^[+-]?\d+$/;

// "!goodpuppy 5" gives 5, capped at max. No number means the default amount.
export function parseAmount(
  commandArguments: string[],
  fallback: number,
  max: number
): number {
  const number = commandArguments.find((argument) => NUMBER.test(argument));
  const typed = Math.abs(Number(number));
  return number === undefined ? fallback : Math.min(max, Math.max(1, typed));
}

// true when this person may use a command now, and starts their cooldown.
// One cooldown per person across all the widget's commands
export function createCooldown(
  seconds: number
): (user: string, now?: number) => boolean {
  const lastUsed = new Map<string, number>();
  return (user, now = Date.now()) => {
    const key = user.toLowerCase();
    const last = lastUsed.get(key);
    if (last !== undefined && now - last < seconds * 1000) return false;
    lastUsed.set(key, now);
    return true;
  };
}

export function initPoint(config: Config): void {
  const isReady = createCooldown(config.commandCooldown);
  const permissions =
    config.commandPermission === 'everyone' ? true : MODERATORS;
  const register = (
    name: string,
    description: string,
    onRun: (commandArguments: string[], sender: string) => void
  ) =>
    new Tixyel.actions.Command({
      prefix: COMMAND_PREFIX,
      name,
      description,
      arguments: false,
      permissions,
      run: (commandArguments, event) => {
        const data = (
          event.data as {
            event?: { data?: { displayName?: string; nick?: string } };
          }
        ).event?.data;
        const sender = data?.displayName ?? data?.nick ?? '';
        if (isReady(sender)) onRun(commandArguments, sender);
      },
    });
  const give =
    (isMinus: boolean) => (commandArguments: string[], user: string) => {
      const max = isMinus ? config.maxMinusAmount : config.maxAmount;
      trigger({
        user,
        isMinus,
        amount: parseAmount(commandArguments, config.amount, max),
      });
    };
  if (config.enableCommand) {
    for (const name of config.commandNames) {
      register(name, 'Give a point', give(false));
    }
  }
  if (config.enableMinusCommand) {
    for (const name of config.minusCommandNames) {
      register(name, 'Take a point away', give(true));
    }
  }
  if (config.enableTotalCommand) {
    for (const name of config.totalCommandNames) {
      register(name, 'Show the total', (_arguments, user) =>
        trigger({ user, totalOnly: true })
      );
    }
  }

  client.on('event', (provider, event) => {
    if (provider !== 'twitch') return;

    if (event.listener === 'cheer-latest') {
      const cheer = event.event;
      if (config.enableBits && cheer.amount >= config.minBits) {
        trigger({
          user: cheer.displayName || cheer.name,
          isMinus: false,
          // one point per Bit, a 500 Bit cheer gives 500
          amount: cheer.amount,
        });
      }
      return;
    }
    if (event.listener !== 'event') return;

    const inner = event.event;
    if (inner.type !== 'channelPointsRedemption') return;
    const { redemption } = inner.data;
    const user = inner.data.displayName || inner.data.username;
    const plus = config.enableReward && config.rewards.get(redemption);
    const minus =
      config.enableMinusReward && config.minusRewards.get(redemption);
    if (plus) trigger({ user, isMinus: false, amount: plus });
    else if (minus) trigger({ user, isMinus: true, amount: minus });
  });

  void new Tixyel.actions.Button({
    field: 'btnTestAnimation',
    name: 'Test animation',
    run: () => trigger({ user: 'testuser' }),
  });

  void new Tixyel.actions.Button({
    field: 'btnTestMinus',
    name: 'Test minus animation',
    run: () => trigger({ user: 'testuser', isMinus: true }),
  });

  void new Tixyel.actions.Button({
    field: 'btnResetTotal',
    name: 'Reset total',
    run: () => resetTotal(),
  });
}
