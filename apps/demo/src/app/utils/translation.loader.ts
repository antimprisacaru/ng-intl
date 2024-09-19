// import { AvailableLanguages } from './available-languages.enum';
//
// export type InferredTranslations<TBase extends string> = {
//   [K in AvailableLanguages]: Record<string, string>
// } & { default: TBase extends string ? infer T : never }
//
// export function createTranslationLoader<TPath extends string>(basePath: TPath) {
//   return {
//     load: async <TLang extends AvailableLanguages>(lang: TLang): Promise<InferredTranslations<TPath>[TLang]> => {
//       return import(`${basePath}/${lang}.json`).then(m => m.default);
//     }
//   };
// }
