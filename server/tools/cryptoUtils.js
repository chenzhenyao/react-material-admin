'use strict';

var crypto = require('crypto');
// md5加密
exports.md5 = function(data) {
  var buffer = new Buffer(data);
  return crypto.createHash('md5').update(buffer.toString('binary')).digest('hex');
};
// aes加密
exports.aesEncrypt = function(data, key) {
  var iv = '';
  var clearEncoding = 'utf8';
  var cipherEncoding = 'base64';
  var cipher = crypto.createCipheriv('aes-128-ecb', key, iv);
  var cipherChunks = [];
  cipherChunks.push(cipher.update(data, clearEncoding, cipherEncoding));
  cipherChunks.push(cipher.final(cipherEncoding));
  return cipherChunks.join('');
};
// aes解密
exports.aesDecrypt = function(data, key) {
  var iv = '';
  var clearEncoding = 'utf8';
  var cipherEncoding = 'base64';
  var decipher = crypto.createDecipheriv('aes-128-ecb', key, iv);
  var plainChunks = [];
  plainChunks.push(decipher.update(data, cipherEncoding, clearEncoding));
  plainChunks.push(decipher.final(clearEncoding));
  return plainChunks.join('');
};