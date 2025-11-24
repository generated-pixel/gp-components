import { Translations } from '../api/translations';

export type GpConfigType = {
  translations?: { [lang: string]: Translations };
};
