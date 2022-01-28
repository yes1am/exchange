const crypto = require('crypto')

const generateKeys = () => {
  return new Promise((resolve, reject) => {
    try {
      const selfsigned = require('selfsigned')  
      const { private, public } = selfsigned.generate(null, { days: 365 })
      resolve({
        err: null,
        publicKey: public,
        privateKey: private,
      })
    } catch (error) {
      reject({
        err: error.toString()
      })
    }
  })
}

// 解密
const decrypt = (data, key ) => {
  const res =  crypto.privateDecrypt(key, Buffer.from(data, 'hex')).toString('utf8');
  return res;
}

// 加密
const encrypt = (data, key) => {
  const res = crypto.publicEncrypt(key, Buffer.from(data, 'utf8')).toString('hex');
  return res
}

module.exports = {
  generateKeys,
  decrypt,
  encrypt
}