const PATTERN_SYMBOLS_REGEX = /0|[\-+]\d/;
const NOT_PATTERN_SYMBOLS_REGEX = /[^0\.\-,+]/;

function parsePattern(
  pattern: string,
  options?: PatternOptions
): PatternConfig {
  pattern = pattern.trim();

  const config: PatternConfig = {} as PatternConfig;

  // EXTRACT PREFIX
  //---------------------
  const pattern_start = pattern.search(PATTERN_SYMBOLS_REGEX);
  if (pattern_start > 0) {
    config.prefix = pattern.substring(0, pattern_start);
    pattern = pattern.substring(pattern_start);
  }
  //---------------------

  // EXTRACT SUFFIX
  //---------------------
  const pattern_end = pattern.search(NOT_PATTERN_SYMBOLS_REGEX);
  if (pattern_end != -1) {
    config.suffix = pattern.substring(pattern_end);
    pattern = pattern.substring(0, pattern_end);
  }
  //---------------------

  config.pattern = pattern;

  // USE SIGN CHECK
  config.use_sign = pattern[0] == "-" || pattern[0] == "+";

  // TODO: ADD A SYNTAX CHECK (Maybe)

  // MASK SYNTAX CHECK
  //---------------------

  //---------------------

  // DECIMALS CHECK
  //---------------------
  const pt = pattern.indexOf(".");
  if (pt != -1) {
    config.fixedCount = pattern.length - pt - 1;
  }
  //---------------------

  // SEPARATOR CHECK
  //---------------------
  const sep = pattern.lastIndexOf(",");
  if (sep != -1) {
    config.separationSize = (pt != -1 ? pt : pattern.length) - sep - 1;
  }
  //---------------------

  // APPLY EXTRA OPTIONS
  //---------------------
  config.options = options;
  //---------------------

  return config;
}

function formatFromPattern(
  num: number,
  pattern: string,
  options?: PatternOptions
): string {
  const config: PatternConfig = parsePattern(pattern, options);
  return formatFromConfig(num, config);
}

function formatFromConfig(num: number, config: PatternConfig): string {
  let [integer, decimal] = num.toString().split(".");

  if (integer[0] == "-" || integer[0] == "+") {
    integer = integer.substr(1);
  }

  if (isNaN(num) || !integer) {
    return "";
  }

  const SEPARATOR = config.options?.separator || ",";

  let strNum: string | undefined;
  if (config.separationSize) {
    let offset: number = integer.length % config.separationSize;

    let chunks: string[] | null = integer
      .substr(offset)
      .match(new RegExp(`\\d{1,${config.separationSize}}`, "g"));

    if (offset && chunks) chunks = [integer.substr(0, offset)].concat(chunks);
    strNum = chunks ? chunks.join(SEPARATOR) : "";
  }

  let strdecimal: string = "";
  if (config.fixedCount) {
    if (decimal) {
      if (config.fixedCount > decimal.length) {
        strdecimal = decimal.padEnd(config.fixedCount, "0");
      } else {
        strdecimal = decimal.substr(0, config.fixedCount);
      }
    } else {
      strdecimal = "0".repeat(config.fixedCount);
    }
  }

  const sign: string = num == 0 ? "" : num > 0 ? "+" : "-";

  //TODO: sign on negative
  return "".concat(
    //Add Prefix
    config.prefix ? config.prefix : "",
    //Add sign if true
    config.use_sign || num < 0 ? sign : "",
    //Add number
    strNum ? strNum : integer,
    //Add decimal numbers
    config.fixedCount ? "." + strdecimal : "",
    //Add suffix
    config.suffix ? config.suffix : ""
  );
}

export = { formatFromConfig, formatFromPattern, parsePattern };
