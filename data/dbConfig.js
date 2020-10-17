const knex = require("knex")

const knexfile = require("../knexfile")
const environment = process.env.DB_CONNECT || "development"

module.exports = knex(knexfile[environment])