import { Inject, Pipe, PipeTransform } from '@angular/core';
import { InterpolationConfig, TranslationConfig, TranslationConfigFormat } from './translation.config';

@Pipe({
  standalone: true,
  name: 'interpolate',
  pure: true,
})
export class InterpolationPipe implements PipeTransform {
  private readonly openSeparator: string;
  private readonly closeSeparator: string;

  constructor(@Inject(TranslationConfig) private config: TranslationConfigFormat) {
    this.openSeparator = InterpolationConfig[config.interpolation].start.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    this.closeSeparator = InterpolationConfig[config.interpolation].end.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }

  transform(value: string | undefined | null, args: Record<string, string>): string {
    if (!value) {
      return '';
    }
    const regex = new RegExp(`${this.openSeparator}\\s*(.*?)\\s*${this.closeSeparator}`, 'g');

    return value.replace(regex, (match, key) => {
      const trimmedKey = key.trim();
      return trimmedKey in args ? args[trimmedKey] : match;
    });
  }
}
