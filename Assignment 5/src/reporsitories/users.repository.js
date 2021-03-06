const User = require('../model/users.model');
const Sequelize = require('Sequelize');

const Op = Sequelize.Op;

async function findAll() {
  return await User.findAll({});
}

async function find(searchBy = {}) {
  const byId = searchBy.id;
  const byName = searchBy.name;
  const byAddress = searchBy.address;
  const byBio = searchBy.bio;
  const byRoleId = searchBy.roleId;

  let user = await User.findAll();

  console.log("Users list in repo : " + user);
  console.log("Users list size in repo : " + user.length);

  if (user.length) {
    if (byId) user = user.filter(u => u.id == byId);
    if (byName) user = user.filter(u => u.name == byName);
    if (byAddress) user = user.filter(u => u.address == byAddress);
    if (byBio) user = user.filter(u => u.bio == byBio);
    if (byRoleId) user = user.filter(u => u.role_id == byRoleId);
  }
  if (!user.length) {
    throw new Error('user not found');
  }
  return await user;
}

async function findOne(name) {
  let user = await User.findAll();
  console.log("Users list size in repo : " + user.length);

  user = user.filter(u => u.name === name);
  if (!user.length) {
    throw new Error('user not found');
  }
  return user;
}

async function insert(user) {
  let userdata = await User.findAll()
  const id = Math.max(...userdata.map(u => u.id)) + 1;
  const newUser = {
    id,
    ...user
  };
  console.log(newUser);

  let userData = await User.create(newUser);
  return userData;
}

async function update(user) {
  let data = await User.update(user ,
    {where: {id:  user.id}}
  );

  console.log(data);
  return user;
}

async function deleteById(id) {
  let user = await User.destroy({
    where: { id: id}
  });

  console.log(user);
  return await User.findAll();
}

module.exports = {
  deleteById,
  findAll,
  find,
  findOne,
  insert,
  update
};
