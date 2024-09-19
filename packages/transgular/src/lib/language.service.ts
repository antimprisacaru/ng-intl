import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AvailableLanguages } from './languages';
import { TranslationConfig, TranslationConfigFormat } from './translation.config';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly #lang$: BehaviorSubject<AvailableLanguages>;
  public readonly lang$: Observable<AvailableLanguages>;

  constructor(@Inject(TranslationConfig) defaultConfig: TranslationConfigFormat) {
    this.#lang$ = new BehaviorSubject<AvailableLanguages>(defaultConfig.defaultLanguage);
    this.lang$ = this.#lang$.asObservable();
  }

  public setLanguage(value: AvailableLanguages): void {
    this.#lang$.next(value);
  }
}
