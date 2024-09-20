# ng-intl

## Revolutionize Your Angular Translations

Tired of juggling translation keys and hunting down typos? Say hello to ng-intl – the game-changing Angular translation library that brings the power of intellisense to your i18n workflow.

🚀 **First of Its Kind**: Harness the full potential of your IDE with unparalleled intellisense support for translations.

🔧 **Type-Safe & Flexible**: Catch errors before they happen and adapt to your project's needs with ease.

🌐 **JSON & TypeScript Ready**: Whether you prefer JSON simplicity or TypeScript sophistication, we've got you covered.

💡 **Smart Interpolation**: Seamlessly integrate dynamic content into your translations.

⚡ **Lightning-Fast Setup**: Get up and running in minutes, not hours.

ng-intl isn't just another translation library – it's your partner in creating truly global Angular applications. Dive in and experience the future of Angular internationalization!

## Features

- Groundbreaking intellisense support for translations
- Dynamic loading of translations for optimal performance
- Seamless support for both JSON and TypeScript (.ts) translation files
- Rock-solid type safety for translation keys
- Clever interpolation support for dynamic content
- Highly configurable language settings
- Intuitive service for effortless translation management

## Installation

```bash
npm install @ng-intl/core
```

## Quick Start

1. Provide the translation service and configuration in your app module or in the `providers` array of your `main.ts`:

```typescript
import { provideTranslation } from '@ng-intl/core';

// ...

providers: [
  provideTranslation() // Uses default configuration
  // Or customize the configuration:
  // provideTranslation({
  //   defaultLanguage: 'en',
  //   interpolation: 'brackets'
  // })
]
```

2. Add the languages and use the translation service in your component:

```typescript
import { createScopedTranslation, LanguageService } from '@ng-intl/core';

const { TranslationService, provideScopedTranslation } = createScopedTranslation({
  en: () => import('./i18n/en.json'),
  es: () => import('./i18n/es'),  // Note: supports both .json and .ts files
  fr: () => import('./i18n/fr.json')
});
```

3. Provide the scoped translation via `provideScopedTranslation()` output, and you can inject the service in your component. 
This will let you use the scoped translation service. 

```typescript
@Component({
  selector: 'app-root',
  template: `
    <header>
      <h1>{{ translations()?.appTitle }}</h1>
      <nav>
        <button (click)="changeLanguage('en')">English</button>
        <button (click)="changeLanguage('es')">Español</button>
        <button (click)="changeLanguage('fr')">Français</button>
      </nav>
    </header>
    <main>
      <p>{{ translations()?.welcomeMessage | interpolate: { username: currentUser } }}</p>
      <p>{{ translations()?.currentLanguage }}: {{ currentLanguage }}</p>
    </main>
  `,
  providers: [provideScopedTranslation()]
})
export class AppComponent {
  protected readonly translations = inject(TranslationService).translations;
  private readonly languageService = inject(LanguageService);

  currentUser = 'John Doe';
  currentLanguage = 'en';

  protected changeLanguage(lang: 'en' | 'es' | 'fr') {
    this.languageService.setLanguage(lang);
  }
}

```

## Configuration

The `provideTranslation()` function sets up the translation configuration. It can be used without arguments to use the default configuration:

```typescript
import { provideTranslation } from '@ng-intl/core';

providers: [
  provideTranslation() // Uses default configuration
]
```

Or you can customize the configuration:

```typescript
import { provideTranslation } from '@ng-intl/core';

providers: [
  provideTranslation({
    defaultLanguage: 'en',
    interpolation: 'brackets' // or 'parentheses'
  })
]
```

Default configuration:
- `defaultLanguage: 'en'`
- `interpolation: 'brackets'`

## License

MIT
