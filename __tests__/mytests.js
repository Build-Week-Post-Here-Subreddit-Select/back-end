const request = require("supertest")
const server = require("../api/server")
const db = require("../data/dbConfig")

const testUser = {username: "testing 123", password:"test123", email:"test123@test.com", name:"Testing"}

describe("server.js", () => {
    describe("GET request for list os posts", () => {
        it ("should return a status code of 400 when not logged in", async () => {
            const res = await request(server).get("/api/posts")
            expect (res.status).toBe(404)
        })
        it ("should return json", async () => {
            const res = await (request)(server).get("/api/posts")
            expect(res.type).toBe("application/json")
        })
    })
    describe("Registering a new user", () => {
        it ("should return with a status code of 201 when creating a new user", async () => {
            await db("users-accounts").truncate()
            const res = await request(server)
            .post("/api/auth/register")
            .send(testUser)
            expect(res.status).toBe(201)
        })
        it ("should return a status of 500 with an invalid user", async () => {
            const res = await request(server)
            .post("/api/auth/register")
            .send({user:"bad-test", pass:"bad-password"})
            expect(res.status).toBe(500)
        })
    })
    describe("Login with user", () => {
        it ("should return a code of 200 with test user", async () => {
            const res = await request(server)
            .post("/api/auth/login")
            .send(testUser)
            expect(res.status).toBe(200)
        })
        it ("should return a status code of 404 when given a non-valid user", async () => {
            const res = await request(server)
            .post("/api/auth/login")
            .send({username: "does not exist", password: "does not exist"})
            expect(res.status).toBe(404)
        })
    })
})