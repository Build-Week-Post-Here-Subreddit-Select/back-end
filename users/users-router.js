const router = require("express").Router()

const Users = require("./users-model")

router.get("/", (req, res) => {
    Users.find()
    .then(user => {
        res.status(200).json({message:"Success",user})
    })
    .catch(err => {
        res.status(404).json({message:"Error with request", err})
    })
})

module.exports = router