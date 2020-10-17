const db = require("../data/dbConfig")

module.exports = {
    getPosts,
    getPostsList,
    addPosts,
    findById,
    update,
    remove
}

function getPosts() {
    return db("posts")
}

function getPostsList(user_id) {
    return db('posts').where({user_id})
}

async function addPosts(post) {
    try {
        const [id] = await db('posts').insert(post, 'id')
        return findById(id)
    } catch (error) {
        throw error
    }
}

function findById(id) {
    return db("posts").where({id}).first()
}

function update(changes, id) {
    return db('posts')
    .where({id})
    .update(changes)
}

function remove(id) {
    return db('posts')
    .where({id})
    .del()
}