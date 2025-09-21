import jwt from "jsonwebtoken"
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJkZXZkdWVsIiwiaWF0IjoxNzU4NDg3NTkxLCJleHAiOjE3NTg0OTExOTF9.GQwKRprnk-W4EaGEQMNhQaMqvNY4JIg8SVz_9izz_c4"

const secret = "jojo123"
const no_secret = "jojo1234"

try {
    const decode = jwt.verify(token, secret)
    console.log(decode)
} catch {
    console.log("nono")
}

try {
    const decode = jwt.verify(token, no_secret)
    console.log(decode)
} catch {
    console.log("nono")
}
