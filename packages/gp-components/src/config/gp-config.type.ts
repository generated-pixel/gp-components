import { Translations } from '../public-api';

export type GPConfigType = {
  translations?: { [lang: string]: Translations };
};
