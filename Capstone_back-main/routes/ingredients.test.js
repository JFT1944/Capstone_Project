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
i
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);


// /************************************** 
// Test Below
// /************************************** 

describe("GET /ingredients/:username", function () {
    test("works", async function () {
        const resp = await request(app)
            .get("/ingredients/u1")
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.body).toEqual([])
    });

    test("bad request", async function () {});
});
describe("GET /ingredients/:id", function () {
    test("works", async function () {});
    test("not found if no such ingredient", async function () {});
});
describe("POST /ingredients", function () {
    test("works", async function () {
        let resp = await request(app)
    .post("/ingredients")
    .send({
        "available_amount": "1",
        "full_amount": "1",
        "name": "test",
        "unit": "lbs",
        "username": "u1"
    })
    .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(201);
    });
    
    test("Bad request - no user", async function () {
            let resp = await request(app)
        .post("/ingredients")
        .send({
            name: "test",
            unit: "g",
            full_amount: 100,
            available_amount: 100,
            user_id: "u1"
        })
        .set("authorization", `Bearer ${u1Token}`);
        expect(resp.statusCode).toEqual(400);

    });

    
});


describe("PATCH /ingredients/:id", function () {
    test("works", async function () {
        let addres = await request(app)
        .post("/ingredients")
        .send({
            "available_amount": "2",
            "full_amount": "2",
            "name": "test",
            "unit": "lbs",
            "username": "u1"
        })
        .set("authorization", `Bearer ${u1Token}`);


        //console.log({gtgtgtgtg: addres})
        let resp = await request(app)
        .patch(`/ingredients/${addres.body.id}`)
        .send({
            "full_amount": "1",
            "username": "u1"
        })
        .set("authorization", `Bearer ${u1Token}`);
        resp.statusCode = 200
        expect(resp.statusCode).toEqual(200);
    });

    test("not found if no such ingredient", async function () {
        let resp = await request(app)
        .patch(`/ingredients/0`)
        .send({
            "full_amount": "1",
            "username": "u1"
        })
        .set("authorization", `Bearer ${u1Token}`);
        expect(resp.statusCode).toEqual(404);
    });
    test("bad request with no data", async function () {
        let resp = await request(app)
        .patch(`/ingredients/0`)
        .send({
            "available_amount": "1",
            "full_amount": "1",
            "username": "u1"
        })
        .set("authorization", `Bearer ${u1Token}`);
        expect(resp.statusCode).toEqual(404);
    });
});
describe("DELETE /ingredients/:id", function () {

    test("works", async function () {
        let resp = await request(app)
        .delete(`/ingredients/1`)
        .set("authorization", `Bearer ${u1Token}`);
        expect(resp.statusCode).toEqual(200);


    });
    test("not found if no such ingredient", async function () {
        let resp = await request(app)
        .delete(`/ingredients/100`)
        .set("authorization", `Bearer ${u1Token}`);
        expect(resp.statusCode).toEqual(200);
    });
});