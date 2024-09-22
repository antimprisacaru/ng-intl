# Angular Internationalization

## Type-Safe and Reactive Translations for Angular

ng-intl revolutionizes Angular internationalization with type-safety, IDE intellisense, and signal-based reactivity.

🚀 **Efficient**: Lazy-load bundled translations without HTTP requests.

🔍 **Type-Safe**: Full TypeScript and IDE intellisense support.

⚡ **Reactive**: Signal-based for seamless language switching.

🔧 **Flexible**: Supports both JSON and TypeScript translation files.

🌐 **Scalable**: Ideal for projects of all sizes.

## Installation

```bash
npm install @ng-intl/core
```

## Quick Start

1. Configure the translation service:

```typescript
import { provideTranslation } from '@ng-intl/core';

providers: [
  provideTranslation({ defaultLanguage: 'en' })
]
```

2. Set up your translations:

```typescript
import { createScopedTranslation, LanguageService } from '@ng-intl/core';

const { TranslationService, provideScopedTranslation } = createScopedTranslation({
  en: () => import('./i18n/en.json'),
  es: () => import('./i18n/es'),
  fr: () => import('./i18n/fr.json')
});
```

3. Use in your component:

```typescript
@Component({
  selector: 'app-root',
  template: `
    <h1>{{ translations()?.appTitle }}</h1>
    <p>{{ translations()?.welcomeMessage | interpolate: { username: currentUser } }}</p>
    <button (click)="changeLanguage('en')">{{ translations()?.languages.english }}</button>
    <button (click)="changeLanguage('es')">{{ translations()?.languages.spanish }}</button>
    <button (click)="changeLanguage('fr')">{{ translations()?.languages.french }}</button>
  `,
  providers: [provideScopedTranslation()]
})
export class AppComponent {
  protected readonly translations = inject(TranslationService).translations;
  private readonly languageService = inject(LanguageService);

  currentUser = 'John Doe';

  protected changeLanguage(lang: 'en' | 'es' | 'fr') {
    this.languageService.setLanguage(lang);
  }
}
```

## Features

- **Lazy Loading**: Translations are bundled but loaded on-demand, optimizing performance without extra HTTP requests.
- **Signal-Based Reactivity**: Translations use Angular signals for perfect reactivity on language changes.
- **Intellisense Support**: Enjoy unparalleled IDE support with autocompletion and type checking for translation keys.
- **Dynamic Language Switching**: Easily switch languages at runtime with built-in language management.
- **Powerful Interpolation**: Handle complex scenarios with variable interpolation, pluralization, and conditional content.
- **Scoped Translations**: Organize translations efficiently with scoped services for different parts of your application.

## InterpolationPipe

The `InterpolationPipe` offers versatile string interpolation and localization:

```html
<!-- Simple interpolation -->
{{ 'Hello, {{name}}!' | interpolate:{ name: 'World' } }}

<!-- Select rule -->
{{ 'mySelectRule: "{gender, select, male {He} female {She} other {They}}"' | interpolate:{ gender: 'female' } }}

<!-- Plural rule -->
{{ 'myPluralRule: "{count, plural, =0 {no results} one {1 result} other {# results}}"' | interpolate:{ count: 5 } }}
```

The pipe supports nested rules, whitespace handling, fallbacks, and various data types, making it suitable for complex internationalization scenarios.

## License

MIT
