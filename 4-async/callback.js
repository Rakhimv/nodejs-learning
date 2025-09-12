import fs from "fs"


function readCallback(path, callback) {
    fs.readFile(path, "utf-8", (err, data) => {
        if(err) return callback(err);
        callback(null, data)
    })
}


readCallback("./test.txt", (err, data) => {
    if(err) console.error("Error")
    console.log(data)
})