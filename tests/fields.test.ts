import { describe, expect, it } from 'vitest';

import { parseFields, parseList, parseRewards } from '@/fields';

describe('parseFields', () => {
  it('defaults to the Good Puppy star with moderator-only command', () => {
    const config = parseFields({});
    expect(config.starText).toBe('+{amount}\nGood Puppy\npoint');
    expect(config.commandPermission).toBe('moderators');
    expect(config.enableBits).toBe(false);
    expect(config.enableReward).toBe(true);
  });

  it('turns a typed \\n into a real line break', () => {
    expect(parseFields({ starText: String.raw`a\nb` }).starText).toBe('a\nb');
  });

  it('reuses the star color when small star color is empty', () => {
    const config = parseFields({ starColor: '#ff0000', smallStarColor: '' });
    expect(config.smallStarColor).toBe('#ff0000');
  });

  it('respects a checkbox saved as false or "false"', () => {
    expect(parseFields({ enableCommand: false }).enableCommand).toBe(false);
    expect(parseFields({ enableReward: 'false' }).enableReward).toBe(false);
    expect(parseFields({ enableBits: true }).enableBits).toBe(true);
  });

  it('never gives less than one point per trigger', () => {
    expect(parseFields({ amount: 0 }).amount).toBe(1);
    expect(parseFields({ amount: 'lots' }).amount).toBe(1);
  });
});

describe('total line options', () => {
  it('shows a pill in the star colour by default', () => {
    const config = parseFields({});
    expect(config.showTotal).toBe(true);
    expect(config.totalStyle).toBe('pill');
    expect(config.totalStyleColor).toBe('');
  });

  it('falls back to the pill for an unknown style', () => {
    expect(parseFields({ totalStyle: 'glitter' }).totalStyle).toBe('pill');
    expect(parseFields({ totalStyle: 'outline' }).totalStyle).toBe('outline');
  });
});

describe('small stars', () => {
  it('can be switched off, for example next to a custom image', () => {
    expect(parseFields({}).showSmallStars).toBe(true);
    expect(parseFields({ showSmallStars: false }).showSmallStars).toBe(false);
  });
});

describe('lists of commands and rewards', () => {
  it('splits on commas and drops empty items', () => {
    expect(parseList(' goodpuppy, gp ,, ')).toEqual(['goodpuppy', 'gp']);
  });

  it('reads Name=N as its own points, the rest get the default', () => {
    expect(parseRewards('Good Puppy point, Super puppy = 5', 2)).toEqual(
      new Map([
        ['Good Puppy point', 2],
        ['Super puppy', 5],
      ])
    );
  });

  it('keeps a name with = but no number as typed', () => {
    expect(parseRewards('a=b', 1).has('a=b')).toBe(true);
  });

  it('caps chat amounts at 10 by default', () => {
    expect(parseFields({}).maxAmount).toBe(10);
    expect(parseFields({ maxMinusAmount: 0 }).maxMinusAmount).toBe(1);
  });
});
