import bcrypt from "bcrypt"

const password = "mypass123"
const hashPass = await bcrypt.hash(password, 10)
const hash = "$2b$10$Hig5NIk5CFxzSlbgcbHQDe.VyCOdOyAo55898rgbQTpjtMuJAB.V2"
const isTrue = await bcrypt.compare(password, hash)
const isTrue2 = await bcrypt.compare(password + "1", hash)

console.log(hashPass)
console.log(isTrue)
console.log(isTrue2)