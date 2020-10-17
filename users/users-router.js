const router = require("express").Router()

const Users = require("./users-model")
const Posts = require("../post/post-model")
const Restricted = require("../auth/restricted-middleware")

router.get("/", Restricted, (req, res) => {
    Users.find()
    .then(user => {
        res.status(200).json({message:"Success",user})
    })
    .catch(err => {
        res.status(404).json({message:"Error with request", err})
    })
})

//Get a list of user's post with thier ID

router.get('/:id/posts/', Restricted, (req, res) => {
    const {id} = req.params
    Posts.getPostsList(id)
    .then(postLists => {
        res.status(200).json({message: 'Success in retrieving your posts', postLists})
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })
})

// Create a new post with a user

router.post('/:id/posts', Restricted, (req, res) => {
    const newPost = req.body 
    Posts.addPosts(newPost)
    .then(postData => {
        res.status(201).json({message: "Success, created a new post", postData})
    })
    .catch(err => {
        res.status(404).json({message: "Failed to create a post", Error: err.message})
    })
})

// Update a user's post

router.put('/:id/posts/', Restricted, (req, res) => {
    const {id} = req.params
    const changes = req.body
    Posts.getPostsList(id)
    .then(oldPost => {
        if (oldPost) {
            Posts.update(changes, id)
            .then(updatedPost => {
                res.status(200).json({message: "Successfully updated post", updatedPost})
            })
        } else {
            res.status(404).json({message: 'Coud not find the post with given ID'})
        }
    })
    .catch(err => {
        res.status(500).json({message: err.message})
    })
})

// Delete a user's post 

router.delete('/:id/posts/:id', Restricted, (req, res) => {
    const {id} = req.params 
    Posts.remove(id)
    .then(deleted => {
        if (deleted) {
            res.status(200).json({message: "Success in deleting post"})
        } else {
            res.status(404).json({message: "Could not find post with given ID"})
        }
    })
    .catch(err => {
        res.status(500).json({message: "Failed to delete post", Error: err.message})
    })
})

module.exports = router