"use strict";

/** Convenience middleware to handle common auth cases in routes. */

const jwt = require("jsonwebtoken");
const { token } = require("morgan");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../expressError");
const db = require("../db")


/** Middleware: Authenticate user.
 *
 * If a token was provided, verify it, and, if valid, store the token payload
 * on res.locals (this will include the username and isAdmin field.)
 *
 * It's not an error if no token was provided or if the token is not valid.
 */

function authenticateJWT(req, res, next) {
  try {
    const authHeader = req.headers && req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace(/^[Bb]earer /, "").trim();
      res.locals.user = jwt.verify(token, SECRET_KEY);
    }
    return next();
  } catch (err) {
    return next();
  }
}

/** Middleware to use when they must be logged in.
 *
 * If not, raises Unauthorized.
 */

// function ensureLoggedIn(req, res, next) {
//   try {
//     if (!res.locals.user) throw new UnauthorizedError();
//     return next();
//   } catch (err) {
//     return next(err);
//   }
// }



// This function checks to see if the user has the correct token to access the route
// and if the user is the correct user to access the route
async function ensureCorrectUser(req, res, next){

//console.log(req.headers.authorization)
//console.log(req.params)
//console.log(req.body)

try {
  
let oToken = req.headers.authorization
let token = oToken.split(' ')
//console.log({token:token[1]})
let verifiedToken = jwt.verify(token[1], SECRET_KEY)
//console.log({'Important Data':[req.body, verifiedToken]})
if(verifiedToken.username !== req.body.username){
  try {
    let checker = await db.query(`SELECT id FROM ingredients WHERE username = $1`, [verifiedToken.username])
    ////console.log({checker:checker.rows})
    let nChecker = checker.rows.find(i => i.id === req.body.id)
    ////console.log({nChecker:nChecker})
    if(nChecker){
      ////console.log('error check passes')
  //console.log({vToken: verifiedToken})
      return next()
    }
  
    //console.log('throwing error')
  } catch (error) {
    throw new UnauthorizedError(error);
  }
}
//console.log('error check passes')
//console.log({vToken: verifiedToken})
return next()
} catch (error) {
  next(error)
}


}



module.exports = {
  authenticateJWT,
  // ensureLoggedIn,
  // ensureAdmin,
  // ensureCorrectUserOrAdmin,
  ensureCorrectUser
};
