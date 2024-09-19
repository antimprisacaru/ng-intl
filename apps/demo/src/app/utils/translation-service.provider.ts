import { computed, Provider, signal, Signal } from '@angular/core';
import { AvailableLanguages } from './languages';
import { createInjectable } from 'ngxtension/create-injectable';
import { BehaviorSubject, catchError, filter, from, map, of, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

// Define a recursive type for nested translation objects
type NestedTranslation<T = string> = {
  [key: string]: T | NestedTranslation<T>;
};

// Generic TranslationImportMap type
type TranslationImportMap = {
  [key: string]: () => Promise<{ default: NestedTranslation }>;
};

// Infer the type of the imported modules
type InferredTranslations<T extends TranslationImportMap> = {
  [K in keyof T]: Awaited<ReturnType<T[K]>>['default'];
};

// Signal type with a call signature for easier access to its value
type TranslationSignal<T> = Signal<T> & {
  (): T;
};

export function translationServiceFactory<T extends TranslationImportMap>(
  translationRecords: T,
  initialLanguage: keyof T
) {
  const TranslationService = createInjectable(
    () => {
      type Translation = InferredTranslations<T>[keyof T];

      const setLanguage$ = new BehaviorSubject<keyof T>(initialLanguage);
      const translations: TranslationSignal<Translation | undefined> = toSignal(
        setLanguage$.pipe(
          switchMap((lang) =>
            from(
              translationRecords[lang]()
                .then((m) => m.default as Translation)
                .catch(() => {
                  console.warn(`Could not load translation for language ${String(lang)}.`);
                  return undefined;
                })
            )
          )
        )
      );

      return {
        translations,
        setLanguage: (lang: keyof T) => setLanguage$.next(lang),
      };
    },
    { providedIn: 'scoped' }
  );

  function provideTranslationService(): Provider[] {
    return [TranslationService];
  }

  return {
    TranslationService,
    provideTranslationService,
  };
}
