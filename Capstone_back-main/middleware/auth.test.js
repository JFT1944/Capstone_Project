"use strict";

const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../expressError");
const {
  authenticateJWT,
  ensureLoggedIn,
  ensureAdmin,
  ensureCorrectUserOrAdmin,
  ensureCorrectUser
} = require("./auth");


const { SECRET_KEY } = require("../config");
const testJwt = jwt.sign({ username: "test" }, SECRET_KEY);
const badJwt = jwt.sign({ username: "test" }, "wrong");


describe("authenticateJWT", function () {
  test("works: via header", function () {
    expect.assertions(2);
    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const req = { headers: { authorization: `Bearer ${testJwt}` } };
    const res = { locals: {} };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    authenticateJWT(req, res, next);
    expect(res.locals).toEqual({
      user: {
        iat: expect.any(Number),
        username: "test"
      },
    });
  });

  test("works: no header", function () {
    expect.assertions(2);
    const req = {};
    const res = { locals: {} };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    authenticateJWT(req, res, next);
    expect(res.locals).toEqual({});
  });

  test("works: invalid token", function () {
    expect.assertions(2);
    const req = { headers: { authorization: `Bearer ${badJwt}` } };
    const res = { locals: {} };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    authenticateJWT(req, res, next);
    expect(res.locals).toEqual({});
  });
});


describe("ensureCorrectUser", function () {

  test("works: correct user, admin", function () {
  expect.assertions(2);
  const req = { headers: { authorization: `Bearer ${testJwt}` }, body:{username:"test"} };
  const res = { locals: {} };
  const next = function (err) {
    expect(err).toBeFalsy();
  };
  ensureCorrectUser(req, res, next);
  expect (res.locals).toEqual({});

});

test("Doesn't work: incorrect user", async function () {
  expect.assertions(2);
  const req = { headers: { authorization: `Bearer ${testJwt}` }, body:{username:""} };
  const res = { locals: {} };
  const next = function (err) {
    expect(err).toBeFalsy();
  };
  await ensureCorrectUser(req, res, next);
  expect (res.locals).toEqual({});

});

// test("Doesn't work: body empty user", async function () {
//   expect.assertions(1);
//   const req = { headers: { authorization: `Bearer ${testJwt}` } };
//   const res = { locals: {} };
//   const next = function (err) {
//     expect(err).toBeFalsy();
//   };
//   await ensureCorrectUser(req, res, next);
//   expect (res.locals).toEqual({});

// });




});