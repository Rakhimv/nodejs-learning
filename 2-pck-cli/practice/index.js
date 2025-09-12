// npm init -y

import chalk from "chalk"


const date = new Date()


console.log(chalk.green("Helo"))
console.log(chalk.yellow(date.toUTCString()));

if(date.getMinutes() % 2 === 0) {
    console.log(chalk.red("Успех!"));
} else {
    console.log(chalk.blue("Ждём удачи..."));
}

console.log(`Привет ${process.argv[2]}!`);
