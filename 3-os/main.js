import os from "os"

console.log("Платформа", os.platform());
console.log("Архитектура", os.arch());
console.log("Кол-во ядер", os.cpus().length);
console.log("Свободная память:", os.freemem());
console.log("Общая память:", os.totalmem());
console.log("Домашняя папка: ", os.homedir());
console.log(os.type());
console.log(os.hostname());
console.log(os.version());
console.log(os.tmpdir());
console.log(os.availableParallelism());
console.log(os.networkInterfaces());
console.log(os.loadavg());
console.log(os.uptime());
console.log(os.userInfo());
// console.log(os.setPriority());
console.log(os.release());
console.log(os.machine());

