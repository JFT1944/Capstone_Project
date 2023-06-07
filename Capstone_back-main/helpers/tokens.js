const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

/** return signed JWT from user data. */

function createToken(user) {
  if(!user) return
  if(!user.username) return
  if(!user.pref_unit) return
  // console.assert(user.isAdmin !== undefined,
  //     "createToken passed user without isAdmin property");
  let payload = {
    username: user.username,
    // isAdmin: user.isAdmin || false,
    ingredient: user.pref_unit
  };

  //console.log(payload)
  return jwt.sign(payload, SECRET_KEY);
}

module.exports = { createToken };
