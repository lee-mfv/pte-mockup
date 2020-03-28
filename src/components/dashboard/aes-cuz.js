// Node.js core modules
const crypto = require('crypto');

const CIPHER_ALGORITHM = 'aes-128-cbc';
const IV_ALGORITHM = 'mfexpo2019aeskey';

var aescbc = {
  encrypt: function(key, plaintext) {
    const cipher = crypto.createCipheriv(CIPHER_ALGORITHM, key, IV_ALGORITHM);
    let crypt = cipher.update(plaintext, 'utf8', 'base64');
    crypt += cipher.final("base64");
    return crypt;
  },

  decrypt: function(key, encrypted) {
    const decipher = crypto.createDecipheriv(CIPHER_ALGORITHM, key, IV_ALGORITHM);
    let decrypt = decipher.update(encrypted, 'base64', 'utf8');
    decrypt += decipher.final();
    return decrypt;
  }
};

function AesCipher(key) {
  if (typeof key !== 'string' || !key) {
    throw new TypeError('Provided "key" must be a non-empty string');
  }

  Object.defineProperty(this, 'key', { value: key });
}

AesCipher.prototype.encrypt = function(plaintext) {
  return aescbc.encrypt(this.key, plaintext);
};

AesCipher.prototype.decrypt = function(encrypted) {
  return aescbc.decrypt(this.key, encrypted);
};

//
// API Extension
//

aescbc.createCipher = function(key) {
  return new AesCipher(key);
};

//
// Export the API
//

module.exports = aescbc;
