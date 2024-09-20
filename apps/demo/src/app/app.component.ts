import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { createScopedTranslation, InterpolationPipe, LanguageService } from '@ng-intl/core';

const { TranslationService, provideScopedTranslation } = createScopedTranslation({
  en: () => import('./i18n/en.json'),
  es: () => import('./i18n/es'),
});

@Component({
  standalone: true,
  imports: [RouterModule, InterpolationPipe],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [provideScopedTranslation()],
})
export class AppComponent {
  protected translations = inject(TranslationService).translations;
  private localeService = inject(LanguageService);

  switchToSpanish(): void {
    this.localeService.setLanguage('es');
  }

  switchToEnglish(): void {
    this.localeService.setLanguage('en');
  }
}
