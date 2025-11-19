import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.ENCRYPTION_KEY || 'default-secret-key-change-in-production';

export const encrypt = (text: string): string => {
  if (!text) return '';
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

export const decrypt = (encryptedText: string): string => {
  if (!encryptedText) return '';
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Error al desencriptar:', error);
    return '';
  }
};
