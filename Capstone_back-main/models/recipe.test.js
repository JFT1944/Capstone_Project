
const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Recipe = require("./recipe.js");
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


describe("create recipe", function () {
    test("works", async function () {
        let res = await Recipe.create("cumin", "g",  "u1");
        res.id = undefined
        expect(res).toEqual({
            name: "cumin",
            ingredients: "g",
            username: "u1",
            id: undefined,})
    });
    test("Bad user", async function () {
        let res = await Recipe.create("cumin", "g",  "none");
        expect(res).toEqual('Bad Request')
    });
});
describe("view recipe", function () {
    test("works", async function () {
        let res = await Recipe.create("cumin", "g",  "u1");

        let newres = await Recipe.getRecipe(res.id)
        expect(newres).toEqual(res)
    });
    
    test("No Recipe", async function () {

        let newres = await Recipe.getRecipe(100000000)
        expect(newres).toEqual(undefined)
    });
    
});
describe("view all recipes", function () {
    test("works", async function () {
        let res = await Recipe.getAllRecipe("u1");
        //console.log(res)
        res[0].id = undefined
        expect(res).toEqual([
            {
              id: undefined,
              name: 'bread',
              ingredients: '[{"name":"flour","amount":500,"unit":"g"},{"name":"water","amount":300,"unit":"ml"},{"name":"salt","amount":10,"unit":"g"}]',
              username: 'u1'
            }
          ])
    });
    test("Bad user", async function () {
        let res = await Recipe.getAllRecipe("u3");
        expect(res).toEqual([])
    });
});
describe("update recipe", function () {
    test("works", async function () {
        let res = await Recipe.create("cumin", "g",  "u1");

        let newres = await Recipe.update(res.id, "cumin2")
        expect(newres).toEqual({
            id: res.id,
            name: "cumin2",
            ingredients: "g",
            username: "u1",
        })
    })
});
  
describe("delete recipe", function () {
    test("works", async function () {
        let res = await Recipe.create("cumin", "g",  "u1");

        let newres = await Recipe.delete(res.id);
        expect(newres).toEqual('Deleted')
    })
});