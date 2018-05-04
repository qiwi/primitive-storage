// @flow

declare type IAny = any

declare class JSON {
  static parse(text: string): IAny;
  static stringify(
    value: IAny,
    replacer?: ?((key: string, value: IAny) => IAny) | Array<IAny>,
    space?: string | number
  ): string;
}
