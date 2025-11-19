import { Translations } from 'gp-components/api';

export type GpConfigType = {
  translations?: { [lang: string]: Translations };
};
