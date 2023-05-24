const login = require('../model/login');
const passwordHashing = async (password) => {
  const salt = await login.generateSalt();
  let newPassword = await login.hashPassword(password, salt);
  return { salt, newPassword };
};
module.exports = passwordHashing;
