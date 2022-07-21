declare const parsePattern: (
  pattern: string,
  options?: PatternOptions
) => PatternConfig;

declare const formatFromPattern: (
  num: number,
  pattern: string,
  options?: PatternOptions
) => string;

declare const formatFromConfig: (num: number, config: PatternConfig) => string;


export { parsePattern, formatFromConfig, formatFromPattern };