import { describe, expect, it } from 'vitest';

import { formatText } from '@/text';

describe('formatText', () => {
  const values = { amount: 1, total: 42, user: 'Kasia' };

  it('fills every known placeholder, repeated ones too', () => {
    expect(formatText('+{amount} for {user}, {total}/{total}', values)).toBe(
      '+1 for Kasia, 42/42'
    );
  });

  it('leaves unknown placeholders visible', () => {
    expect(formatText('{totl} points', values)).toBe('{totl} points');
  });
});
