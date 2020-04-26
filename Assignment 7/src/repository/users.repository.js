const User = require('../model/users.model');
const Token = require('../model/token.model');

const Sequelize = require('Sequelize');
const AuthUtils = require('../utilities/authutils');
require('dotenv').config();

const Op = Sequelize.Op;

function findAll(options = {}) {
  return new Promise((resolve, reject) => {
    resolve(User.findAll(options));
  });
}

function signup(user) {

  return new Promise((resolve, reject) => {

    if (!user) {
      reject("No valid data found");
    }

    AuthUtils.generateHash(user.password)
      .then(hash => {
        console.log(user.password);
        user.password = hash;
        console.log(user.password);
        return User.findAll()
      })
      .then(userdata => {
        var id = 1;
        console.log(userdata);
        if (userdata) {
          id = Math.max(...userdata.map(u => u.id)) + 1;
        }
        const newUser = { id, ...user };
        console.log(newUser);
        return newUser 
      })
      .then(newUser => {
        console.log(newUser);
        let userData = User.create(newUser);
        return userData
      })
      .then(userData => {
        console.log(userData);
        resolve(userData);
      }).catch(err => reject(err));
  });
}

function login(userData) {
  return new Promise((resolve, reject) => {
    verify(userData)
      .then(user => {
        user.password = "";
        console.log("User validated");
        Token.findAll()
        .then(tokenData => {
          var id = 1
          if (tokenData) {
            var id = Math.max(...tokenData.map(u => u.id)) + 1;
          }

          const token = AuthUtils.generateJWTToken(user);
          var tokenData = { id : id, userid: user.id, token: token };
          console.log(tokenData);
        
          return Token.create(tokenData) 
        })
        .then(data => {
          resolve({ token: data.token, user: user })
        });
      })
      .catch(err => reject(err));

  });
}


function findOne(query = {}) {
  return User.findOne(query).exec();
}

function verify(creds = {}) {
  return new Promise((resolve, reject) => {
    let query;

    if (creds.email) query = User.findOne({ where : { email: creds.email } });

    if (!query) reject(new Error("Invalid Query"));

    query
      .then(user => {
        console.log(user);
        if (!user) reject(new Error("Invaild Credentials"));
        const userDetails = user.dataValues;
        console.log(userDetails);
        AuthUtils.verifyPassword(userDetails.password, creds.password)
        .then(verified => {
          console.log("Password verified",  verified);
          // ! Must not be sent on FE
          verified ? resolve(userDetails) : reject(new Error("Invaild Credentials"));
        })
      })
      .catch(err => void reject(err));
  });
}


module.exports = {
  findAll,
  signup,
  login
};
