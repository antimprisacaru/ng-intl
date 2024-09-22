import { TestBed } from '@angular/core/testing';
import { InterpolationPipe } from '../interpolation.pipe';
import { provideTranslation } from '../translation.provider';

describe('InterpolationPipe', () => {
  let pipe: InterpolationPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InterpolationPipe, provideTranslation()],
    });
    pipe = TestBed.inject(InterpolationPipe);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('Simple Interpolation', () => {
    it('should handle basic variable replacement', () => {
      expect(pipe.transform('Hello, {{name}}!', { name: 'World' })).toBe('Hello, World!');
    });

    it('should handle multiple variables', () => {
      expect(pipe.transform('{{greeting}}, {{name}}!', { greeting: 'Hello', name: 'World' })).toBe('Hello, World!');
    });

    it('should ignore spaces in variable names', () => {
      expect(pipe.transform('Hello, {{ name }}!', { name: 'World' })).toBe('Hello, World!');
    });

    it('should leave unmatched variables unchanged', () => {
      expect(pipe.transform('Hello, {{name}}! {{missing}}', { name: 'World' })).toBe('Hello, World! {{missing}}');
    });

    it('should handle number variables', () => {
      expect(pipe.transform('You have {{count}} messages.', { count: 5 })).toBe('You have 5 messages.');
    });

    it('should handle boolean variables', () => {
      expect(pipe.transform('Notifications are {{enabled}}.', { enabled: true })).toBe('Notifications are true.');
    });
  });

  describe('Select Rules', () => {
    it('should handle basic select rule', () => {
      const input = 'mySelectRule: "{gender, select, male {He} female {She} other {They}}"';
      expect(pipe.transform(input, { gender: 'male' })).toBe('mySelectRule: "He"');
      expect(pipe.transform(input, { gender: 'female' })).toBe('mySelectRule: "She"');
      expect(pipe.transform(input, { gender: 'other' })).toBe('mySelectRule: "They"');
    });

    it('should use "other" as fallback in select rule', () => {
      const input = 'mySelectRule: "{gender, select, male {He} female {She} other {They}}"';
      expect(pipe.transform(input, { gender: 'unknown' })).toBe('mySelectRule: "They"');
    });

    it('should handle select rule with complex values', () => {
      const input = 'mySelectRule: "{user, select, admin {Full access} moderator {Limited access} other {No access}}"';
      expect(pipe.transform(input, { user: 'admin' })).toBe('mySelectRule: "Full access"');
      expect(pipe.transform(input, { user: 'moderator' })).toBe('mySelectRule: "Limited access"');
      expect(pipe.transform(input, { user: 'guest' })).toBe('mySelectRule: "No access"');
    });

    it('should handle multiple select rules', () => {
      const input =
        'gender: "{gender, select, male {He} female {She} other {They}}" pronoun: "{gender, select, male {his} female {her} other {their}}"';
      expect(pipe.transform(input, { gender: 'male' })).toBe('gender: "He" pronoun: "his"');
      expect(pipe.transform(input, { gender: 'female' })).toBe('gender: "She" pronoun: "her"');
      expect(pipe.transform(input, { gender: 'other' })).toBe('gender: "They" pronoun: "their"');
    });
  });

  describe('Plural Rules', () => {
    it('should handle basic plural rule', () => {
      const input = 'myPluralRule: "{count, plural, =0 {no results} one {1 result} other {# results}}"';
      expect(pipe.transform(input, { count: 0 })).toBe('myPluralRule: "no results"');
      expect(pipe.transform(input, { count: 1 })).toBe('myPluralRule: "1 result"');
      expect(pipe.transform(input, { count: 2 })).toBe('myPluralRule: "2 results"');
    });

    it('should handle exact matches in plural rules', () => {
      const input = 'myPluralRule: "{count, plural, =0 {no results} =1 {exactly one result} other {# results}}"';
      expect(pipe.transform(input, { count: 0 })).toBe('myPluralRule: "no results"');
      expect(pipe.transform(input, { count: 1 })).toBe('myPluralRule: "exactly one result"');
      expect(pipe.transform(input, { count: 2 })).toBe('myPluralRule: "2 results"');
    });

    it('should replace # with the actual count', () => {
      const input = 'myPluralRule: "{count, plural, =0 {no results} one {# result} other {# results}}"';
      expect(pipe.transform(input, { count: 5 })).toBe('myPluralRule: "5 results"');
    });

    it('should handle multiple plural rules', () => {
      const input =
        'apples: "{apples, plural, =0 {no apples} one {1 apple} other {# apples}}" oranges: "{oranges, plural, =0 {no oranges} one {1 orange} other {# oranges}}"';
      expect(pipe.transform(input, { apples: 0, oranges: 1 })).toBe('apples: "no apples" oranges: "1 orange"');
      expect(pipe.transform(input, { apples: 1, oranges: 2 })).toBe('apples: "1 apple" oranges: "2 oranges"');
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle nested interpolation, select, and plural rules', () => {
      const input =
        '{{user}} has myPluralRule: "{count, plural, =0 {no {{item}}s} one {1 {{item}}} other {# {{item}}s}}" and mySelectRule: "{gender, select, male {he likes} female {she likes} other {they like}} it."';
      const result = pipe.transform(input, { user: 'Alice', count: 2, item: 'apple', gender: 'female' });
      expect(result).toBe('Alice has myPluralRule: "2 apples" and mySelectRule: "she likes it."');
    });

    it('should handle multiple nested rules', () => {
      const input =
        'gender: "{gender, select, male {He has} female {She has} other {They have}}" count: "{count, plural, =0 {no items} one {one item} other {# items}}"';
      expect(pipe.transform(input, { gender: 'male', count: 0 })).toBe('gender: "He has" count: "no items"');
      expect(pipe.transform(input, { gender: 'female', count: 1 })).toBe('gender: "She has" count: "one item"');
      expect(pipe.transform(input, { gender: 'other', count: 5 })).toBe('gender: "They have" count: "5 items"');
    });
  });

  describe('Edge Cases', () => {
    it('should return an empty string for null input', () => {
      expect(pipe.transform(null, {})).toBe('');
    });

    it('should return an empty string for undefined input', () => {
      expect(pipe.transform(undefined, {})).toBe('');
    });

    it('should handle missing arguments', () => {
      const input = '{{var1}} {{var2}} mySelectRule: "{var3, select, a {A} b {B} other {C}}"';
      expect(pipe.transform(input, { var1: 'Hello' })).toBe('Hello {{var2}} mySelectRule: "C"');
    });

    it('should handle empty select and plural rules', () => {
      const input = 'select: "{var, select,}" plural: "{count, plural,}"';
      expect(pipe.transform(input, { var: 'test', count: 5 })).toBe('select: "" plural: ""');
    });
  });
});
