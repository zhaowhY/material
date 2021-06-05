/* eslint-disable no-underscore-dangle */
// vi (初始变量)、key(秘钥)、mode(加密模式)、padding(填充方式)
// AES对称加密，前后端约定好key, vi, mode, padding
import CryptoJS from 'crypto-js';

const key = CryptoJS.enc.Utf8.parse('MgssCVvNUAjubNaO4bJtYOOFSF6URd8Uh');
const iv = CryptoJS.enc.Utf8.parse('AszHa3gXiUY5XjeNi');

function getKeyAndIv(option) {
  if (Object.prototype.toString.call(option) === '[object Object]' && option.key && option.iv) {
    return {
      key: CryptoJS.enc.Utf8.parse(option.key),
      iv: CryptoJS.enc.Utf8.parse(option.iv),
    };
  }
  return { key, iv };
}

export const encrypt = (value, option) => {
  const { key: _key, iv: _iv } = getKeyAndIv(option);
  const _value = CryptoJS.enc.Utf8.parse(value);
  const encrypted = CryptoJS.AES.encrypt(_value, _key, {
    iv: _iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
};
export const decrypt = (value, option) => {
  const { key: _key, iv: _iv } = getKeyAndIv(option);
  const decrypted = CryptoJS.AES.decrypt(value, _key, {
    iv: _iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};
