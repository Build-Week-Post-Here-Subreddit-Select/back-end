const db = require("../data/dbConfig")

module.exports = {
    add,
    find,
    findBy,
    findById
}

function find() {
    return db("users-accounts").select("id", "username").orderBy("id")
}

async function add(){
    try {
        const [id] = await db("users").insert(user, "id")
        return findById(id)
    } catch (error) {
        throw error
    }
}

function findBy(filter) {
    return db("users-accounts").select("id", "username").orderBy("id")
}

function findById(id) {
    return db("users-accounts").where({id}).first()
}