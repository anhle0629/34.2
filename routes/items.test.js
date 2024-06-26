process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");

let kitkat = {name: kitkat, price: 2.00}

beforeEach(()=>{
    items.push(kitkat)
})

afterEach(()=>{
    items.length = 0 ;

})


