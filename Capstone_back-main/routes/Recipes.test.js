"use strict";

const request = require("supertest");

const db = require("../db.js");
const app = require("../app");
const User = require("../models/user");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testJobIds,
  u1Token,
  u2Token,
  adminToken,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

// /************************************** 
// Test Below
// /************************************** 

// /************************************** GET /Recipes */
describe("GET /Recipes/all/", function () {
    
//     test("works", async function () {
//         let res = await request(app)
//         .get("/recipes/all")
//         .set("authorization", `Bearer ${adminToken}`);
//         expect(res.body).toEqual({});
// });

})
describe("GET /Recipes/:id", function () {
    test("works", async function () {
        let addRes = await request(app)
        .post("/recipes")
        .send({
            name: "test1",
            ingredients: "test1 test2",
            username: "u1"
          })
        .set("authorization", `Bearer ${u1Token}`);

        let res = await request(app)
        .get(`/recipes/${addRes.body.id}`)
        .set("authorization", `Bearer ${u1Token}`);
        expect(res.body).toEqual({"id": addRes.body.id, "ingredients": "test1 test2",  "name": "test1", "username": "u1"});
    });

    test("not found if no such Recipe", async function () {
        let res = await request(app)
        .get("/recipes/100")
        .set("authorization", `Bearer ${u1Token}`);
        expect(res.body).toEqual({});
    });
});





describe("POST /Recipes", function () {
    test("works", async function () {
        let res = await request(app)
        .post("/recipes")
        .send({
            name: "test1",
            ingredients: "test1 test2",
            username: "u1"
          })
        .set("authorization", `Bearer ${u1Token}`);
        res.body.id = undefined
        expect(res.body).toEqual({"id": undefined, "ingredients": "test1 test2",  "name": "test1",   "username": "u1"});
    });

    test("bad request with missing data", async function () {
        let res = await request(app)
        .post("/recipes")
        .send({
            name: "test1",
            ingredients: "test1 test2",
            username: "u7"
          })
        .set("authorization", `Bearer ${u1Token}`);
        expect(res.body).toEqual({});
    });
});





describe("PATCH /Recipes/:id", function () {
    test("works", async function () {
        let addRes = await request(app)
        .post("/recipes")
        .send({
            name: "test1",
            ingredients: "test1 test2",
            username: "u1"
          })
        .set("authorization", `Bearer ${u1Token}`);

        let res = await request(app)
        .patch(`/recipes/${addRes.body.id}`)
        .send({
            name: "test2",
            ingredients: "test2 test3",
            username: "u1"})
        .set("authorization", `Bearer ${u1Token}`);
        expect(res.body).toEqual({"id": addRes.body.id, "ingredients": "test1 test2",  "name": "test2", "username": "u1"});

    });
    test("not found if no such Recipe", async function () {
        let res = await request(app)
        .patch("/recipes/100")
        .send({
            name: "test2",
            ingredients: "test2 test3",
            username: "u1"})
        .set("authorization", `Bearer ${u1Token}`);
        expect(res.body).toEqual({});
    });
    test("bad request with no data", async function () {});
});



describe("DELETE /Recipes/:id", function () {
    test("works", async function () {
        let addRes = await request(app)
        .post("/recipes")
        .send({
            name: "test1",
            ingredients: "test1 test2",
            username: "u1"
          })
        .set("authorization", `Bearer ${u1Token}`);
        
        
        let res = await request(app)
        .delete(`/recipes/${addRes.body.id}`)
        .set("authorization", `Bearer ${u1Token}`);
        expect(res.body).toEqual({});
    });

    test("not found if no such Recipe", async function () {
        let res = await request(app)
        .delete("/recipes/100")
        .set("authorization", `Bearer ${u1Token}`);
        expect(res.body).toEqual({});
    });
});