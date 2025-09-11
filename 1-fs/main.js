import fs from "fs"

const text = fs.readFileSync("helo.txt", "utf-8")
console.log(text, text.length);

fs.writeFileSync("text.txt", "Привет мир!")
fs.appendFileSync("text.txt", " Куку ")
if (fs.existsSync("text.txt")) {
    console.log("Ого")
}
fs.readFile("text.txt", "utf-8", (err, data) => {
    if (err) throw err;
    console.log(data, data.length);
})
fs.unlinkSync("text.txt")



if (!fs.existsSync("Попка")) {
    fs.mkdirSync("Попка")
}
const files = fs.readdirSync("Попка")
console.log(files);

const statInfo = fs.statSync("helo.txt")
console.log(statInfo.size)
console.log(statInfo.birthtime)
console.log(statInfo.mtime)
console.log(statInfo.dev)
console.log(statInfo.blocks)
