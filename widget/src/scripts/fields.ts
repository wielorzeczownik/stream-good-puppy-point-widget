import type { StreamElements } from '@tixyel/streamelements';

import type { CommandPermission, Config, TotalStyle } from '@/types';

const DEFAULT_COMMAND = 'goodpuppy';
const DEFAULT_REWARD = 'Good Puppy point';
const DEFAULT_MIN_BITS = 100;
const DEFAULT_STAR_TEXT = '+{amount}\nGood Puppy\npoint';
const DEFAULT_MINUS_COMMAND = 'badpuppy';
const DEFAULT_TOTAL_COMMAND = 'goodpuppies';
const DEFAULT_MINUS_REWARD = 'Bad Puppy point';
const DEFAULT_MINUS_STAR_TEXT = '-{amount}\nBad Puppy\npoint';
const DEFAULT_MINUS_STAR_COLOR = '#F8C8C8';
const DEFAULT_TOTAL_TEXT = '{total} Good Puppy points';
const DEFAULT_TOTAL_FONT_SIZE = 26;
const TOTAL_STYLES = new Set<string>(['pill', 'outline', 'none']);
const DEFAULT_FONT = 'Short Stack';
const DEFAULT_FONT_SIZE = 44;
const DEFAULT_TEXT_COLOR = '#111111';
const DEFAULT_STAR_COLOR = '#C8E2F8';
const DEFAULT_STAR_SIZE = 420;
const DEFAULT_SOUND_VOLUME = 80;
const DEFAULT_HOLD_DURATION = 3;
const DEFAULT_MAX_AMOUNT = 10;
const DEFAULT_COMMAND_COOLDOWN = 10;

// "goodpuppy, gp" -> ["goodpuppy", "gp"]
export function parseList(value: string): string[] {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

// "Good Puppy point, Super puppy=5", a reward without =N gives the default
export function parseRewards(
  value: string,
  fallback: number
): Map<string, number> {
  return new Map(
    parseList(value).map((entry): [string, number] => {
      const equals = entry.lastIndexOf('=');
      const points = entry.slice(equals + 1).trim();
      return equals > 0 && /^\d+$/.test(points)
        ? [entry.slice(0, equals).trim(), Math.max(1, Number(points))]
        : [entry, fallback];
    })
  );
}

export function parseFields(
  raw: Record<string, StreamElements.CustomField.Value>
): Config {
  const getString = (key: string, fallback = '') =>
    String(raw[key] ?? fallback);
  const isEnabled = (key: string, isDefault = true) =>
    raw[key] === undefined
      ? isDefault
      : raw[key] !== false && raw[key] !== 'false';
  const getNumber = (key: string, fallback: number) => {
    const parsed = Number(raw[key] ?? fallback);
    return Number.isNaN(parsed) ? fallback : parsed;
  };
  const starColor = getString('starColor', DEFAULT_STAR_COLOR);
  const multiline = (key: string, fallback: string) =>
    getString(key, fallback).replaceAll(String.raw`\n`, '\n');
  const textColor = getString('textColor', DEFAULT_TEXT_COLOR);
  const amount = Math.max(1, Math.round(getNumber('amount', 1)));
  const getMax = (key: string) =>
    Math.max(1, Math.round(getNumber(key, DEFAULT_MAX_AMOUNT)));

  return {
    commandNames: parseList(getString('commandName', DEFAULT_COMMAND)),
    enableCommand: isEnabled('enableCommand'),
    commandPermission:
      getString('commandPermission') === 'everyone'
        ? 'everyone'
        : ('moderators' satisfies CommandPermission),
    enableReward: isEnabled('enableReward'),
    rewards: parseRewards(getString('rewardName', DEFAULT_REWARD), amount),
    enableMinusCommand: isEnabled('enableMinusCommand', false),
    minusCommandNames: parseList(
      getString('minusCommandName', DEFAULT_MINUS_COMMAND)
    ),
    enableTotalCommand: isEnabled('enableTotalCommand'),
    totalCommandNames: parseList(
      getString('totalCommandName', DEFAULT_TOTAL_COMMAND)
    ),
    enableMinusReward: isEnabled('enableMinusReward', false),
    minusRewards: parseRewards(
      getString('minusRewardName', DEFAULT_MINUS_REWARD),
      amount
    ),
    minusStarText: multiline('minusStarText', DEFAULT_MINUS_STAR_TEXT),
    minusStarColor: getString('minusStarColor', DEFAULT_MINUS_STAR_COLOR),
    minusTextColor: getString('minusTextColor') || textColor,
    enableBits: isEnabled('enableBits', false),
    minBits: Math.max(1, getNumber('minBits', DEFAULT_MIN_BITS)),
    amount,
    maxAmount: getMax('maxAmount'),
    commandCooldown: Math.max(
      0,
      getNumber('commandCooldown', DEFAULT_COMMAND_COOLDOWN)
    ),
    maxMinusAmount: getMax('maxMinusAmount'),
    starText: multiline('starText', DEFAULT_STAR_TEXT),
    showTotal: isEnabled('showTotal'),
    totalText: getString('totalText', DEFAULT_TOTAL_TEXT),
    totalFontSize: Math.max(
      8,
      getNumber('totalFontSize', DEFAULT_TOTAL_FONT_SIZE)
    ),
    totalTextColor: getString('totalTextColor'),
    totalStyle: (TOTAL_STYLES.has(getString('totalStyle'))
      ? getString('totalStyle')
      : 'pill') as TotalStyle,
    totalStyleColor: getString('totalStyleColor'),
    fontFamily: getString('fontFamily', DEFAULT_FONT),
    fontSize: Math.max(8, getNumber('fontSize', DEFAULT_FONT_SIZE)),
    textColor,
    starColor,
    smallStarColor: getString('smallStarColor') || starColor,
    showSmallStars: isEnabled('showSmallStars'),
    minusShowSmallStars: isEnabled('minusShowSmallStars'),
    starWobble: isEnabled('starWobble'),
    starSize: Math.max(100, getNumber('starSize', DEFAULT_STAR_SIZE)),
    customImageUrl: getString('customImageUrl'),
    minusCustomImageUrl: getString('minusCustomImageUrl'),
    soundUrl: getString('soundUrl'),
    minusSoundUrl: getString('minusSoundUrl'),
    soundVolume: Math.min(
      100,
      Math.max(0, getNumber('soundVolume', DEFAULT_SOUND_VOLUME))
    ),
    holdDuration: Math.max(0, getNumber('holdDuration', DEFAULT_HOLD_DURATION)),
  };
}
