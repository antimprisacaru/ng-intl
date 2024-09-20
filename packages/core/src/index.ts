import { InterpolationPipe } from './lib/interpolation.pipe';
import { LanguageService } from './lib/language.service';
import { TranslationConfig, TranslationConfigFormat } from './lib/translation.config';
import { provideTranslation } from './lib/translation.provider';
import { createScopedTranslation } from './lib/translation-service.factory';

export {
  InterpolationPipe,
  LanguageService,
  TranslationConfig,
  TranslationConfigFormat,
  provideTranslation,
  createScopedTranslation,
};
