
const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Ingredient = require("./ingredient.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);








// ##############################
// // Tests Below
// ##############################


describe("create ingredient", function () {
    test("works", async function () {
        let res = await Ingredient.create({name: "cumin", unit: "g", full_amount: 1000, available_amount: 1000, username: "u1"});
        res.id = undefined
        expect(res).toEqual({
            name: "cumin",
            unit: "g",
            full_amount: 1000,
            available_amount: 1000,
            id: undefined,})
    });
    test("Bad user", async function () {
        let res = await Ingredient.create({name: "cumin", unit: "g", full_amount: 1000, available_amount: 1000, username: "u3"});
        expect(res).toEqual('Bad Request')
    });
});


describe("view ingredient", function () {
    // test("works", async function () {
    //     let res = await Ingredient.get("flour", "u1");
    //     //console.log(res)
        
    //     expect(res).toEqual({
    //         name: "flour",
    //         unit: "g",
    //         full_amount: 1000,
    //         available_amount: 1000})
    // });


    test("not found if no such ingredient", async function () {});

});


describe("view all ingredient", function () {
    test("works", async function () {
        let res = await Ingredient.getAll("u1");
        //console.log(res)
        let newres = res.map((r) => {r.id = undefined; return r})
    
        expect(newres).toEqual([ {
            "available_amount": 1000,
            "full_amount": 1000,
            "id": undefined,
            "name": "flour",
            "unit": "g",
          },
        {
            "available_amount": 1000,
            "full_amount": 1000,
            "id": undefined,
            "name": "sugar",
            "unit": "g",
          },
        {
            "available_amount": 1000,
            "full_amount": 1000,
            "id": undefined,
            "name": "salt",
            "unit": "g",
          },
        {
            "available_amount": 1000,
            "full_amount": 1000,
            "id": undefined,
            "name": "water",
            "unit": "ml",
        },
   ])
    });
    
    test("not found if no ingredients", async function () {
        let res = await Ingredient.getAll("u3");
        expect(res).toEqual([])
    });


});


describe("Update ingredient", function () {
    test("works", async function () {
        let res = await Ingredient.update({id:1, available_amount:{available_amount: 500}});
       //console.log(res)
    //    let res2 = await Ingredient.getID(res.id);
    //    //console.log({res2:res2})
       
    //      expect(res2).toEqual({
    //         name: "flour",
    //         unit: "g",
    //         full_amount: 1000,
    //         available_amount: 500,
    //         username: "u1"})
    });

    test("Bad input", async function () {});
    test("Bad Credentials", async function () {});
});


describe("delete ingredient", function () {
    test("works", async function () {
        let res = await Ingredient.remove(1);
        expect(res).toEqual('Deleted')
    });
    
});