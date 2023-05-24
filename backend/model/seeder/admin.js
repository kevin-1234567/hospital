const login = require('../login');
const signup = require('../signup');
require('dotenv').config();
const { connection, connect, set } = require('mongoose');
set('strictQuery', false);
const passwordHashing = require('../../module/passwordHash');

connect('mongodb+srv://kevin:kevin1@cluster0.ilasivs.mongodb.net/hospital', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createSeedData = async (req, res) => {
  try {
    let { salt, newPassword } = await passwordHashing('kevin@123');
    const adminSeed = {
      name: 'kevin',
      email: 'kevin@spericorn.com',
      password: newPassword,
      role: 'Admin',
      phoneNumber: '8943196911',
      salt,
    };
    const existingDoc = await login.findOne({ email: adminSeed.email });
    if (!existingDoc) {
      const loginData = await login.create({
        email: adminSeed.email,
        password: adminSeed.password,
        salt: adminSeed.salt,
      });

      const signupData = await signup.create({
        name: adminSeed.name,
        role: adminSeed.role,
        phoneNumber: adminSeed.phoneNumber,
        loginId: loginData.id,
      });

      console.log(`Admin created successfully`);
    } else {
      console.log(`Data already exists`);
    }
  } catch (error) {
    console.log(error);
  } finally {
    connection.close();
  }
};

createSeedData();
