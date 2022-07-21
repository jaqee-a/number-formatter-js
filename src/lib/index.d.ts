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

interface String {
  padEnd(padLength: number, string: string): string;
  repeat(count: number);
}

function isNaN(number: string): boolean;
