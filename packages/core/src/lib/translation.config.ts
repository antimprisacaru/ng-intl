import { InjectionToken } from '@angular/core';
import { AvailableLanguages } from './languages';

export type TranslationConfigFormat = {
  defaultLanguage: AvailableLanguages;
};

export const defaultConfigs: TranslationConfigFormat = {
  defaultLanguage: 'en',
};

export const TranslationConfig = new InjectionToken<TranslationConfigFormat>('TranslationConfig');
