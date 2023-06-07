"use strict";

const db = require("../db.js");
const User = require("../models/user");
// const Company = require("../models/company");
// const Job = require("../models/job");
const { createToken } = require("../helpers/tokens");
const Ingredient = require("../models/ingredient.js");
const Recipe = require("../models/recipe.js");

const testJobIds = [];
let i;

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM ingredients");
  await db.query("DELETE FROM recipes");

  // await Company.create(
  //     {
  //       handle: "c1",
  //       name: "C1",
  //       numEmployees: 1,
  //       description: "Desc1",
  //       logoUrl: "http://c1.img",
  //     });
  // await Company.create(
  //     {
  //       handle: "c2",
  //       name: "C2",
  //       numEmployees: 2,
  //       description: "Desc2",
  //       logoUrl: "http://c2.img",
  //     });
  // await Company.create(
  //     {
  //       handle: "c3",
  //       name: "C3",
  //       numEmployees: 3,
  //       description: "Desc3",
  //       logoUrl: "http://c3.img",
  //     });

  // testJobIds[0] = (await Job.create(
  //     { title: "J1", salary: 1, equity: "0.1", companyHandle: "c1" })).id;
  // testJobIds[1] = (await Job.create(
  //     { title: "J2", salary: 2, equity: "0.2", companyHandle: "c1" })).id;
  // testJobIds[2] = (await Job.create(
  //     { title: "J3", salary: 3, /* equity null */ companyHandle: "c1" })).id;

  await User.register({
    username: "u1",
    first_name: "U1F",
    last_name: "U1L",
    email: "user1@user.com",
    password: "password1",
    pref_unit: "SI",
  });
  await User.register({
    username: "u2",
    first_name: "U2F",
    last_name: "U2L",
    email: "user2@user.com",
    password: "password2",
    pref_unit: "US",
  });
  await User.register({
    username: "u3",
    first_name: "U3F",
    last_name: "U3L",
    email: "user3@user.com",
    password: "password3",
    pref_unit: "SI",
  });

  await Ingredient.create({
    name: "test1",
    unit: "g",
    quantity: 100,
    user_id: "u1"
  });
  await Ingredient.create({
    name: "test2",
    unit: "g",
    quantity: 100,
    user_id: "u1"
  });
  
  i = await Ingredient.create({
    name: "test3",
    unit: "g",
    quantity: 100,
    user_id: "u1"
  }).id;
  
  await Recipe.create({
    name: "test1",
    instructions: "test1",
    user_id: "u1"
  });
  await Recipe.create({
    name: "test2",
    instructions: "test2",
    user_id: "u1"
  });
  await Recipe.create({
    name: "test3",
    instructions: "test3",
    user_id: "u1"
  });

  // await User.applyToJob("u1", testJobIds[0]);
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}


const u1Token = createToken({ username: "u1", pref_unit: "SI" });
const u2Token = createToken({ username: "u2", pref_unit: "US" });




module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token,
  i
};
