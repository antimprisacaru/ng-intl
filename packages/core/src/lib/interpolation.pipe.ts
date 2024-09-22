import { Inject, Pipe, PipeTransform } from '@angular/core';
import { TranslationConfig, TranslationConfigFormat } from './translation.config';
import MessageFormatter from '@messageformat/core';

@Pipe({
  name: 'interpolate',
  standalone: true,
})
export class InterpolationPipe implements PipeTransform {
  private formatter: MessageFormatter;

  constructor(@Inject(TranslationConfig) config: TranslationConfigFormat) {
    // TODO: make this reactive to lang changes
    this.formatter = new MessageFormatter(config.defaultLanguage);
  }

  transform(value: string | null | undefined, properties: Record<string, string | number | boolean>): string {
    if (value == null) {
      return '';
    }

    try {
      // First, handle simple interpolation with double brackets
      const simpleInterpolated = this.simpleInterpolate(value, properties);

      // Then, handle empty select and plural rules
      const emptyRulesHandled = this.handleEmptyRules(simpleInterpolated);

      // Finally, use a custom compile function for complex operations
      return this.customCompile(emptyRulesHandled, properties);
    } catch (error) {
      console.error('Error interpolating message:', error);
      return value;
    }
  }

  private simpleInterpolate(value: string, properties: Record<string, string | number | boolean>): string {
    return value.replace(/\{\{(\s*[\w.]+\s*)}}/g, (match, key) => {
      const trimmedKey = key.trim();
      return Object.prototype.hasOwnProperty.call(properties, trimmedKey) ? String(properties[trimmedKey]) : match;
    });
  }

  private handleEmptyRules(value: string): string {
    // Handle empty select rules
    value = value.replace(/\{(\w+),\s*select\s*,\s*}/g, '');

    // Handle empty plural rules
    value = value.replace(/\{(\w+),\s*plural\s*,\s*}/g, '');

    return value;
  }

  private customCompile(message: string, properties: Record<string, string | number | boolean>): string {
    const compiledFunc = this.formatter.compile(message);
    const proxyHandler = {
      get: (target: never, prop: string) => {
        if (prop in target) {
          return target[prop];
        }
        // Return a string representation of the unmatched key
        return `{${prop}}`;
      },
    };
    const proxyProperties = new Proxy(properties, proxyHandler);
    return compiledFunc(proxyProperties);
  }
}
