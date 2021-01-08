# NFJS (NumberFormatter JS)

[![Build Status](https://travis-ci.com/MohDe31/number-formatter-js.svg?branch=master)](https://travis-ci.com/MohDe31/number-formatter-js)

## Introduction

A fast number formatter with no external libraries

## Usage

```js
const {
  formatFromPattern,
  formatFromConfig,
  parsePattern,
} = require("number-formatter-js");

formatFromPattern(1000000, "$0,000.00"); // "$1,000,000.00"
formatFromPattern(1000000, "$+0,000.00"); // "$+1,000,000.00"
formatFromPattern(-1000000, "$+0,000.00"); // "$-1,000,000.00"
formatFromPattern(1000000, "+++-> +0,000.00USD"); // "+++-> +1,000,000.00USD"

// Recommended usage for using the same pattern more than one time
// To avoid re-parsing the pattern
let config = parsePattern("+++-> +0,000.00USD");
formatFromConfig(-1000000, config); // +++-> -1,000,000.00USD
formatFromConfig(1000000, config); // +++-> +1,000,000.00USD

// Customize the separator
formatFromPattern(1000000, "+++-> +0,000.00USD", { separator: "'" }); // "+++-> +1'000'000.00USD"
```

## Demo

Link to a jsfiddle to help you get started: https://jsfiddle.net/MohDe/p8ymc1vr/

## Format Guid

| Description   | Symbol | Summary                                                                                                                                                                                                                                    |
| ------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Zero          | 0      | Defines digits cannot be used in the prefix/suffix                                                                                                                                                                                         |
| Separator     | ,      | Defines a separation for example 0,00 -> Separate by 2 digits. 0,000 -> Separate by 3 digits.                                                                                                                                              |
| Decimal Point | .      | Show Decimal Numbers for example 0.00 -> Shows 2 decimal digits. 0,00.000-> Shows 2 decimal digits and separates by 2 digits                                                                                                               |
| Signs         | +/-    | Must be used right before the number mask/pattern with no white space in between for example: +0,00.000, -0,00.000 AND NOT + 0,00.000, - 0,00.000 (the sign here will be counted as a prefix) Signs could be used in the suffix and prefix |
| Suffix/Prefix |        | Anything that is not a zero outside the mask/pattern for example +$(-0,00.00) -> Prefix = +$( Suffix = ) Pattern= -0,00.00 So the number 12345 will result -> +$(1,23,45.00)                                                               |

## Notes

- If you want to use Zeros in the prefix you should change the PatternConfig for example:

````js
let config = parsePattern("+0,000.000$");
config.prefix = "(000)";
formatFromConfig(1000, config); // output: (000)1,000.000$
```


## Installation
Using npm
    npm install --save number-formatter-js

Using yarn
    yarn add number-formatter-js
````
