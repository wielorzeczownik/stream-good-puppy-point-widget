import Tixyel from '@tixyel/streamelements';

import client from '@/client';
import { initPoint } from '@/commands/point';
import { parseFields } from '@/fields';
import { init } from '@/star';

if (import.meta.env.DEV) {
  void Tixyel.Local.start();
}

client.on('load', () => {
  const config = parseFields(client.fields);
  init(config);
  initPoint(config);

  if (import.meta.env.DEV) {
    void import('@/development-panel').then(({ initDevelopmentPanel }) =>
      initDevelopmentPanel(config)
    );
  }
});
