/**
 * Hash function
 */
'use strict';

const Long = require('long');
const crc = require('crc');
const crypto = require('crypto');

/**
 * Hash function using md5
 * @param  {String} key The key is used to generate hash key
 * @return {String} Hashed key
 */
const md5Func = (key) => {
  let md5 = crypto.createHash('md5');
  md5.update(key);
  let rst = md5.digest('hex');
  return Long.fromString(rst, false, 16).toString();
};


/**
 * Hash function using crc32.
 * @param  {String} key The key is used to generate hash key
 * @return {String} Hashed key
 */
const crc32Func = (key) => {
  return crc.crc32(key);
}

exports.crc32Func = crc32Func;
exports.md5Func = md5Func;
