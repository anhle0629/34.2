const express = require("express")
const app = express()
const itemsRoutes = require("./routes/items")
const ExpressError = require("./expressError")


app.use(express.json());
app.use("/items", itemsRoutes)


///404 handle//
app.use(function(request,response,next){
    return new ExpressError("Not Found", 404)
})

//General Error Handling//
app.use((err, request, response, next) => {
    response.status(err.status || 500);

    return response.json({
        // error: err.message; 
    })
})


module.exports = app;