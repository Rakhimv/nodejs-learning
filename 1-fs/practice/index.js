import fs from "fs"

const folderPath = "notes"
const filePath = `${folderPath}/today.txt`

if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath)
}


fs.mkdirSync(folderPath)
fs.writeFileSync(filePath, "Сегодня я учу Node.js")
fs.appendFileSync(filePath, "\nЭто мой первый лог!")

const text = fs.readFileSync(filePath, "utf-8")
console.log(text)

if (fs.existsSync(filePath)) {
    console.log("Файл найден")
} else {
    fs.writeFileSync(filePath, "")
}

const fileStat = fs.statSync(filePath)
console.log(fileStat.size);

setTimeout(() => {
    fs.unlinkSync(filePath)
    fs.rmdirSync(folderPath)
}, 2000);

