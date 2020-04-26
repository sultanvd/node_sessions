const jwt =  require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const SECRET_KEY = "JWT_SECRET";
const TOKEN_PREFIX = "Bearer ";

function generateJWTToken(userData){
   return jwt.sign(userData, SECRET_KEY);
}

function verifyToken(jwtToken) {
  if(jwtToken){
    jwtToken = jwtToken.substring(TOKEN_PREFIX.length);
  }

  return new Promise((resolve, reject) => {
    try{
       const verified = jwt.verify(jwtToken, SECRET_KEY);
       verified ? resolve(verified) : reject(new Error("invalid token"));
   }catch(e){
      reject(e);
   }
  });
}

async function generateHash(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        reject(err);
      }
      resolve(hash);
    });

  });
}

function verifyPassword(userPassword, credPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(credPassword, userPassword, function (err, res) {
      resolve(res);
    });  
  });
}

module.exports = {
  generateJWTToken,
  verifyToken,
  generateHash,
  verifyPassword
};
