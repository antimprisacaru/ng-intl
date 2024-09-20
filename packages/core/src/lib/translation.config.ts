import { InjectionToken } from '@angular/core';
import { AvailableLanguages } from './languages';

export const InterpolationConfig = {
  brackets: {
    start: '{{',
    end: '}}',
  },
  parantheses: {
    start: '((',
    end: '))',
  },
} as const;

export type TranslationConfigFormat = {
  defaultLanguage: AvailableLanguages;
  interpolation: keyof typeof InterpolationConfig;
};

export const defaultConfigs: TranslationConfigFormat = {
  defaultLanguage: 'en',
  interpolation: 'brackets',
};

export const TranslationConfig = new InjectionToken<TranslationConfigFormat>('TranslationConfig');
