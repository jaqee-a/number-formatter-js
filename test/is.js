const { assert } = require("console");

module.exports = function is(v1, v2) {
  assert(v1 == v2, `TEST FAILED :      ${v1} != ${v2}`);
};
