import bcrypt from 'bcryptjs';

const verifyPasswords = (plainText, hashedPassword) => {
  if (!plainText || !hashedPassword) {
    return false;
  }
  return bcrypt.compareSync(plainText, hashedPassword);
};

export default verifyPasswords;
