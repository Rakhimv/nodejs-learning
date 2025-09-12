import path from "path"

const filePath = "C:/Users/RT/Documents/lection09.pdf"

console.log("Имя файла: ", path.basename(filePath));
console.log("Папка файла: ", path.dirname(filePath));
console.log("Расширение: ", path.extname(filePath));
console.log("Разобрать: ", path.parse(filePath));
console.log("Собрать: ", path.join("С", "Users", "RT", "Desktop", "NodeJS", "3-os"));

