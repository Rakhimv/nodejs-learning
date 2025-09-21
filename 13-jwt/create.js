import jwt from "jsonwebtoken"

const user = {id: 1, username: "devduel"}
const secret = "jojo123"
const token = jwt.sign(user, secret, {expiresIn: "1h"})
console.log(token)