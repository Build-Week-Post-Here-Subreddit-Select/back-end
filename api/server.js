const express = require("express")
const helmet = require("helmet")
const morgan = require("morgan")

const server = express()

server.use(helmet())
server.use(express.json())
server.use(morgan('combined'))

server.get("/", (req, res) => {
    res.json({message: "Post Here-SubReddit Backend API is up :-)"})
})

module.exports = server