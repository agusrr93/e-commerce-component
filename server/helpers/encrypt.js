const crypto = require('crypto');


class Encrypt {
  
  static hashPassword(password, secret) {
    const hashed = crypto.createHmac('sha256', 'helloworld')
    .update(password)
    .digest('hex');
    
    return hashed
  }  
  
}

module.exports = Encrypt