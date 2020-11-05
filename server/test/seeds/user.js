const { User } = require('@/models');
const { createJWT } = require('@/utils/auth');
require('dotenv').config();

const expectedUser = {
  id: 1,
  nickname: 'user11',
  password: 'useruser',
  image: 'hi',
};

const newUser = {
  id: 4,
  nickname: 'newUser',
  password: 'useruser',
};

const initUsers = async () => {
  const users = [
    {
      id: 1,
      nickname: 'user11',
      password: 'useruser',
      image: 'hi',
    },
    {
      id: 2,
      nickname: 'user22',
      password: 'useruser',
    },
    {
      id: 3,
      nickname: 'user33',
      password: 'useruser',
    },
  ];

  await User.bulkCreate(users);
};

const finiUsers = async () => {
  await User.destroy({ where: {} });
};

const expectedUserToken = createJWT(expectedUser);

module.exports = { initUsers, finiUsers, expectedUser, newUser, expectedUserToken };
