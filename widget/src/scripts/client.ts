import Tixyel from '@tixyel/streamelements';

export const WIDGET_ID = 'good-puppy-point';

const client = new Tixyel.Client({
  id: WIDGET_ID,
  debug: import.meta.env.DEV,
});

export default client;
