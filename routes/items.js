const express = require("express") 
const router = new express.Router()
const ExpressError = require("../expressError")
const items = require("../fakeDB")
// const { request } = require("http")
// const { response } = require("../app")



//show a general list of items//
router.get("/", function(request, response){
    response.json(items)
})

//add an item//
router.post("/", (request, response, next)=>{
    try{
        if(!request.body.name && !request.body.price)throw new ExpressError("Name and Price are require",400);
        const newItem = {name: request.body.name, price: request.body.price}
        items.push(newItem)
        return response.status(201).json({item: newItem})

    }catch(e){
        return next(e)
    }
})

//Single Item// 
router.get("/:name", (request, response)=>{
    const foundItem = items.find((item)=>{item.name === request.param.name})
    if(foundItem === undefined){
        throw new ExpressError("item cannot be found", 404)
    }
    response.json({item: foundItem})
})

router.patch("/:name", (request, reponse)=>{
    const foundItem = items.find((item)=>{item.name === request.param.name})
    if(foundItem === undefined){
        throw new ExpressError("item cannot be found", 404)
    }
    foundItem.name = request.body.name;
    foundItem.price = request.body.price
    response.json({item: foundItem})
})

router.delete("/:name", (request, reponse)=>{
    const foundItem = items.find((item)=>{item.name === request.param.name})
    if(foundItem === -1){
        throw new ExpressError("Item not found", 404)
    }
    items.splice(foundItem, 1)
    response.json({message: "deleted"})
})

module.exports = router;



//suggestions
//1. request.param.name should be request.params.name in several places.
//2. items.find() should return the found item itself, but in the delete route, you're treating it as an index.
//3.In the delete route, use index to find the item to delete.
