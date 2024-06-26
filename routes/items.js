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