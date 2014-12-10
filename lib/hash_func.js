/**
 * Hash function
 */

var crypto = require('crypto');

/**
 * Hash function mixed with md5
 * @param  {String} key The key is used to generate hash key
 * @return {String}     Hashed key
 */
var md5HashFunc = function (key) {
  var md5 = crypto.createHash('md5');
  md5.update(key);
  var rst = md5.digest('hex');
  return parseInt(rst, 16);
};

exports.md5HashFunc = md5HashFunc;