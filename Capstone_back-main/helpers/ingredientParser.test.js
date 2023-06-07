"use strict"
process.env.NODE_ENV = 'test'




const ingredientHelper = require("./ingredientParser");
const db = require("../db");


async function beforeAll(){
    await db.query('insert into users (username, password, first_name, last_name, email) values (test, password, test, test, SI)')

}


async function commonAfterAll() {
  await db.end();
}
async function commonAfterEach(){

    await db.query('DELETE FROM ingredients')
    await db.query('DELETE FROM users')
}

describe("ingredientParser.parser", function () {

it(".Parser working", function () {
let testRecipe = `1/2 cup of flour \n 1/4 cup of sugar \n 1/2 cup of milk`
let res = ingredientHelper.parser(testRecipe)
expect(res).toEqual(["1/2 cup of flour ", " 1/4 cup of sugar ", " 1/2 cup of milk"])

})


it('should show .parser not working with empty input', function(){

    let res = ingredientHelper.parser()
    expect(res).toEqual([])

})

it('should not work with an object', function(){
let testRecipe = {name: 'test', ingredients: '1/2 cup of flour \n 1/4 cup of sugar \n 1/2 cup of milk'}


    let res = ingredientHelper.parser(testRecipe)
    expect(res).toEqual([])

})
})
// ###############################################################
// ###############################################################

describe("ingredientParser.zestfulAPI",  function () {

//     it(".ZestfulApi working", async function () {
//     let testRecipe = ["1/2 cup of flour ", " 1/4 cup of sugar "]
//     let res = await ingredientHelper.ZestfulApi(testRecipe)
//     expect(res).toEqual([
//         {
//  "confidence": 0.9397966,
// 	"error": null,
//           "ingredientParsed":  {
// 		 "preparationNotes": null,
//             	 "product": "flour",
// 		"productSizeModifier": null,
//             	"quantity": 0.5,
//             	"unit": "cup",
// 		 "usdaInfo":  {
//     	        "category": "Cereal Grains and Pasta",
//     	       "description": "Wheat flour, white, all-purpose, unenriched",
//     	       "fdcId": "169761",
//     	       "matchMethod": "closestUnbranded",
//            },
//           },
//           "ingredientRaw": "1/2 cup of flour ",
//         },
//         {
//          "confidence": 0.9532449999999999,
//         "error": null,
//           "ingredientParsed":  {
//            "preparationNotes": null,
//             "product": "sugar",
//            "productSizeModifier": null,
//             "quantity": 0.25,
//             "unit": "cup",
//        "usdaInfo":  {
//             "category": "Sweets",
//              "description": "Sugars, granulated",
//              "fdcId": "169655",
//              "matchMethod": "exact",
//            },
//           },
//           "ingredientRaw": " 1/4 cup of sugar ",
//         },
//       ]
//                 )}
//     )

it('should show .ZestfulApi not working with empty input', async function(){
    
        let res = await ingredientHelper.ZestfulApi()
        expect(res).toEqual(undefined)        

})

it('should show .ZestfulApi not working with anything but array', async function(){
    
        let res = await ingredientHelper.ZestfulApi({})
        expect(res).toEqual(undefined)        

})



})

// ###############################################################
// ###############################################################

describe("ingredientParse.sorter",  function () {

// it(".sorter working", async function () {
// let res = await ingredientHelper.sorter('test', [
//     {  confidence: 0.9397966,
//         error: null,
//         ingredientParsed:  {
//             preparationNotes: null,
//             product: "flour",
//             productSizeModifier: null,
//             quantity: 0.5,
//             unit: "cup",
//             usdaInfo:  {}
//         },
//         ingredientRaw: "1/2 cup of flour ",
//     }])

//     let test = await db.query('SELECT * FROM ingredients')
//     expect (test.rows[0]).toEqual({})
// })



})


commonAfterAll();