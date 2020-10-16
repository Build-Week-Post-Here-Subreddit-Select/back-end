const express = require("express")
const helmet = require("helmet")
const morgan = require("morgan")

const UserRouter = require("../users/users-router")
const PostRouter = require("../post/post-router")

const server = express()

server.use(helmet())
server.use(express.json())
server.use(morgan('combined'))

server.use("/api/posts", PostRouter)
server.use("/api/users", UserRouter)

server.get("/", (req, res) => {
    res.json({message: "Post Here-SubReddit Backend API is up :-)"})
})

module.exports = server