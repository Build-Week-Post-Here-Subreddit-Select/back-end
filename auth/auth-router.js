const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const router = require("express").Router()
const Users = require("../users/users-model")
const {isValid} = require("../users/users-service")

const {jwtSecret} = require("../config/secrets")

router.post("/register", async (req, res, next) => {
    const credentials = req.body
    console.log('USERS CREDENTIALS:',credentials)
        if (isValid(credentials)) {
            const rounds = process.env.BCRYPT_ROUNDS ? parseInt(process.env.BCRYPT_ROUNDS) : 8
            const hash = bcrypt.hashSync(credentials.password, rounds)
            credentials.password = hash 
            const user = await Users.add(credentials)
            res.status(201).json({message: `Congratulations ${user.username} on Registering`, user})
            console.log('USER REGISTERED:', credentials)
        } else {
            next({ apiCode: 400, apiMessage: 'Username or Password missing'})
        }
    // } catch (err) {
    //     next({apiCode: 500, apiMessage: "Error saving new user", ...err})
    // }
})

router.post("/login", (req, res) => {
    const {username, password} = req.body

    if (isValid(req.body)) {
        console.log('USERNAME:', username)
        console.log('PASSWORD:', password)
        Users.findBy({username: username})
        .then((user) =>{
            console.log("USER:", user)
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user)
                console.log("TOKEN:", token)
                res.status(200).json({message: `Welcome ${username}`, token: token})
                {console.log('VERIFY USER', user)}
            } else {
                res.status(404).json({message: "Invalid credentials"})
            }
        })
        .catch(error => {
            res.status(500).json({error: error.message})
        })
    } else {
        res.status(404).json({message: "Please provide username and password"})
    }
})

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username
    }
    const options = {
        expiresIn: "1d"
    }
    const token = jwt.sign(payload, jwtSecret, options)
    return token
}

module.exports = router
