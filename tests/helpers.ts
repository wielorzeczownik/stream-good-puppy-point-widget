import { parseFields } from '@/fields';
import type { Config } from '@/types';

export function makeConfig(overrides: Partial<Config> = {}): Config {
  return { ...parseFields({}), ...overrides };
}
