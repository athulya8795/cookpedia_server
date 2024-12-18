// 1
require('dotenv').config()

// 2
const express = require("express")

// 3
const cors = require("cors")

// 4
const cookpediaServer = express()

// 5
cookpediaServer.use(cors())

// 10
require("./config/connection")

// 11
const router = require('./routes/router')

// 6
cookpediaServer.use(express.json())

// 12
cookpediaServer.use(router)

// 7
const PORT = 3000 || process.env.PORT

// 8
cookpediaServer.listen(PORT,()=>{
    console.log(`Cookpedia Server started at port :${PORT} and waiting for client request !!!`);   
})

// 9
cookpediaServer.get('/',(req,res)=>{
    res.status(200).send(`<hl style="color:red;">Cookpedia Server started and waiting for client request !!!</h1>`)
})