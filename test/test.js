const { formatFromPattern } = require("../lib/nfj");

const is = require("./is");

is(formatFromPattern(+11, "0.0"), "11.0");
is(formatFromPattern(-11, "0.0"), "-11.0");
is(formatFromPattern(11, "0.000"), "11.000");
is(formatFromPattern(+11.25, "0.0"), "11.2");
is(formatFromPattern(-11, "$0.0"), "$-11.0");
is(formatFromPattern(+11, "0.0 dollars"), "11.0 dollars");
is(formatFromPattern(1000000, "$0,000.00"), "$1,000,000.00");
is(formatFromPattern(1000000, "$00,00"), "$1,00,00,00");
is(formatFromPattern(1000000, "-> 000,0.00USD"), "-> 1,0,0,0,0,0,0.00USD");
is(formatFromPattern(1000000, "++++-> +000,0.00USD"), "++++-> +1,0,0,0,0,0,0.00USD");
