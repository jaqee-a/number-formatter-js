interface PatternOptions {
  separator: string;
}

interface PatternConfig {
  use_sign: boolean;
  pattern: string;
  prefix: string;
  suffix: string;
  fixedCount: number;
  separationSize: number;
  options: PatternOptions | undefined;
}

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
