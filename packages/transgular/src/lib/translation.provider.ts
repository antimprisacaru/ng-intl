import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { LanguageService } from './language.service';
import { defaultConfigs, TranslationConfig, TranslationConfigFormat } from './translation.config';

export function provideTransgular(config: Partial<TranslationConfigFormat> = defaultConfigs): EnvironmentProviders {
  return makeEnvironmentProviders([
    LanguageService,
    {
      provide: TranslationConfig,
      useValue: { ...defaultConfigs, ...config },
    },
  ]);
}
