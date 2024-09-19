import { Component, effect, inject, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { translationServiceFactory } from './utils/translation-service.provider';

const { TranslationService, provideTranslationService } = translationServiceFactory({ en: () => import('./i18n/en'), es: () => import('./i18n/es') }, 'en');

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [provideTranslationService()],
})
export class AppComponent {
  protected translations = inject(TranslationService).translations;

  constructor() {
    effect(() => {
      console.log(this.translations())
    });
  }
}
