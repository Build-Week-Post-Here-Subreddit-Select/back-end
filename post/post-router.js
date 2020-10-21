const router = require("express").Router()
const Posts = require('./post-model')

const Restricted = require("../auth/restricted-middleware")

//Get the list of Posts

router.get('/', Restricted, (req, res) => {
    Posts.getPosts()
    .then(post => {
        res.status(200).json({message: "Success in retreiving all of the posts", post})
    })
    .catch(err => {
        res.status(500).json({message: 'Error in retreiving your posts', err})
    })
})

// Get a specific post with an ID

router.get('/:id', Restricted, (req, res) => {
    const {id} = req.params

    Posts.findById(id)
    .then(post => {
        if (post) {
            res.status(200).json({message: "Success", post})
        } else {
            res.status(404).json({message: "Could not find the post with the given ID"})
        }
    })
    .catch(err => {
        res.status(500).json({message: "Error with the database", err})
    })
})

// Create a post

router.post("/", Restricted, (req, res) => {
    Posts.addPosts(req.body)
    .then(newPost => {
        res.status(201).json({message:"Congrats on creating a new post", newPost})
    })
    .catch(err => {
        res.status(500).json({message:"There was a problem with creating a post", err})
    })
})

// Update post

router.put('/:id', Restricted, (req, res) => {
    const { id} = req.params
    const changes = req.body
    Posts.findById(id)
    .then(post => {
        if(post) {
            Posts.update(changes, id)
            .then(updatedPost => {
                res.status(201).json({message: "Success in updating your post", updatedPost})
            })
        } else {
            res.status(404).json({message: "Could not find post with given ID"})
        }
    })
    .catch(err => {
        res.status(500).json({message:"There was a problme with the backend", err})
    })
})

// Delete post

router.delete("/:id", Restricted, (req, res) => {
    const { id} = req.params 
    Posts.remove(id)
    .then(deleted => {
        if (deleted) {
            res.status(200).json({message: "Success in deleting post", Deleted: deleted})
        } else {
            res.status(404).json({message:"Could not find post with the given ID"})
        }
    })
    .catch(err => {
        res.status(500).json({message:"There was an error with our backend", err})
    })
})

module.exports = router