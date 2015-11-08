/**
 * Hash function
 */
'use strict';

const Long = require('long');
const crypto = require('crypto');

/**
 * Hash function using md5
 * @param  {String} key The key is used to generate hash key
 * @return {Long}
 */
const md5HashFunc = (key) => {
  let md5 = crypto.createHash('md5');
  md5.update(key);
  let rst = md5.digest('hex');
  return Long.fromString(rst, false, 16).toString();
};

exports.md5HashFunc = md5HashFunc;