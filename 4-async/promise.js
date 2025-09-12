import fs from "fs/promises"


function readPromise(path) {
    return fs.readFile(path, "utf-8")
}


readPromise("./test.txt").then((data) => console.log(data)).catch((err) => console.log(err))



const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        const success = true;
        if (success) {
            resolve("✅ Всё получилось!");
        } else {
            reject("❌ Ошибка");
        }
    }, 1000);
});

promise
    .then((result) => console.log("Результат:", result))
    .catch((err) => console.error("Ошибка:", err));
