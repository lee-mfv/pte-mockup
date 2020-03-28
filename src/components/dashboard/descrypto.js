// Node.js core modules
const crypto = require('crypto');

const CIPHER_ALGORITHM = 'des-ecb';
const IV_ALGORITHM = '';

var descrypto = {
  encrypt: function(key, plaintext) {
    const cipher = crypto.createCipheriv(CIPHER_ALGORITHM, key, IV_ALGORITHM);
    cipher.setAutoPadding(false)
    let crypt = cipher.update(plaintext, 'utf8', 'base64');
    crypt += cipher.final("base64");
    return crypt;
  },

  decrypt: function(key, encrypted) {
    const decipher = crypto.createDecipheriv(CIPHER_ALGORITHM, key, IV_ALGORITHM);
    decipher.setAutoPadding(false)
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
  return descrypto.encrypt(this.key, plaintext);
};

AesCipher.prototype.decrypt = function(encrypted) {
  return descrypto.decrypt(this.key, encrypted);
};

//
// API Extension
//

descrypto.createCipher = function(key) {
  return new AesCipher(key);
};

//
// Export the API
//

module.exports = descrypto;
