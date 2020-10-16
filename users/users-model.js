const db = require("../data/dbConfig")

module.exports = {
    add,
    find,
    findBy,
    findById
}

function find() {
    return db("users-accounts").select("id", "username", "email", "name").orderBy("id")
}

async function add(user){
    try {
        const [id] = await db("users-accounts").insert(user, "id")
        return findById(id)
    } catch (error) {
        throw error
    }
}

function findBy(filter) {
    return db("users-accounts").where(filter).select("id", "username", "password").first()
}

function findById(id) {
    return db("users-accounts").where({id}).first()
}