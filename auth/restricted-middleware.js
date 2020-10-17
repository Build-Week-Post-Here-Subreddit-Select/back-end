const jwt = require("jsonwebtoken")
const {jwtSecret} = require("../config/secrets")

module.exports = (req, res, next) => {
    console.log("AUTHORIZATION HEADER:", req.headers.authorization)
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : ''
    console.log("TOKEN:", token)
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({message: err.message})
            } else {
                req.decodedToken = decodedToken
                next()
            }
        })
    } else {
        res.status(404).json({message: "Missing credentials"})
    }
}