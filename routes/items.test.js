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


describe("GET /items", ()=>{
    test("Get all item", async ()=>{
        const resp = await request(app).get("/items")
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({item:[kitkat]})
    })
})

describe("GET /items/:name", ()=>{
    test("Get item by name", async ()=>{
        const resp = await request(app).get(`/items/${kitkat.name}`)
        expect(resp.statusCode).toBe(200)
        expect(resp.body).toEqual({item:[kitkat]})
    })
    test("Respond invliad if it not the correct item", async()=>{
        const resp = await request(app).get(`/items/${watermelon.name}`)
        expect(resp.statusCode).toBe(404)
    })
})

describe("POST /items", ()=>{
    test("creating a new item", async ()=>{
        const resp = await request(app).post("/items").send({name:"snicker"}, {price:2.99})
        expect(statusCode).toBe(201)
        expect(resp.body).toEqual({name:"snicker"},{price:2.99})
    })
    test("Respond with a 404 if the name or price is missing", async ()=>{
        const resp = await request(app).post("/items").send({});
        expect(statusCode).toBe(404)
    })
})

describe("PATCH /items/:name", ()=>{
    test("updating an item price", async ()=>{
        const resp = await request(app).patch(`/items/${kitkat.name}`).send({name:"kitkat"},{price:0.99})
        expect(statusCode).toBe(200)
        expect(resp.body).toEqual({name:'kitkat'},{price:0.99})
    })
    test("test for invalid name", async ()=>{
        const resp = await request(app).patch(`/items/${kitkat.name}`).send({name:"blueyy"})
        expect(statusCode).toBe(404)
    })
})

describe("DELETE /items/:name", ()=>{
    test("deleting an item", async ()=>{
        const resp = await request(app).delete(`/items/${kitkat.name}`);
        expect(statusCode).toBe(200)
        expect(resp.body).toEqual({message:'delete'})
    })
    test("Responds with 404 for deleting invalid", async ()=>{
        const resp = await request(app).delete("/items/popstart")
        expect(statusCode).toBe(404)
    })
})