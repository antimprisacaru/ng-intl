import { InterpolationPipe } from './lib/interpolation.pipe';
import { LanguageService } from './lib/language.service';
import { TranslationConfig, TranslationConfigFormat } from './lib/translation.config';
import { provideTransgular } from './lib/translation.provider';
import { translationServiceFactory } from './lib/translation-service.factory';

export {
  InterpolationPipe,
  LanguageService,
  TranslationConfig,
  TranslationConfigFormat,
  provideTransgular,
  translationServiceFactory,
};
