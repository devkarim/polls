export const APP_NAME = 'Polls';
export const APP_DESCRIPTION =
  'Polls based website where any user can make any kind of voting public.';
export const APP_VERSION = '1.0.0';

export const __prod__ = process.env.NODE_ENV == 'production';
export const __dev__ = !__prod__;

export const APP_DOMAIN = 'polls.karimwael.com';
export const APP_URL = `https://${APP_DOMAIN}`;
