const router = require("express").Router()

const Users = require("./users-model")
const Posts = require("../post/post-model")

router.get("/", (req, res) => {
    Users.find()
    .then(user => {
        res.status(200).json({message:"Success",user})
    })
    .catch(err => {
        res.status(404).json({message:"Error with request", err})
    })
})

router.get('/:id/posts/', (req, res) => {
    const {id} = req.params
    Posts.getPostsList(id)
    .then(postLists => {
        res.status(200).json({message: 'Success in retrieving your posts', postLists})
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })
})

module.exports = router