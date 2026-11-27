import Tixyel from '@tixyel/streamelements';

import { WIDGET_ID } from '@/client';

export const storage = new Tixyel.modules.useStorage<{ total: number }>({
  id: WIDGET_ID,
  data: { total: 0 },
});
