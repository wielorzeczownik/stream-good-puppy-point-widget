export type TextValues = {
  amount: number;
  total: number;
  user: string;
};

// unknown {placeholders} stay as typed so a typo is visible on stream
export function formatText(template: string, values: TextValues): string {
  const known: Record<string, string> = {
    amount: String(values.amount),
    total: String(values.total),
    user: values.user,
  };
  return template.replaceAll(
    /\{(\w+)\}/g,
    (match: string, key: string) => known[key] ?? match
  );
}
