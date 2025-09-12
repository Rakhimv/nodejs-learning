import { exec } from "child_process"



async function changeBright(bright) {
    let command = `powershell.exe (Get-WmiObject -Namespace root/WMI -Class WmiMonitorBrightnessMethods).WmiSetBrightness(1,${bright})`

    await exec(command, (err, stdout, stderr) => {
        if (err) {
            console.log("Ошибка");
            return;
        }
        if (stderr) {
            console.log("Стандартная ошибка");
            return
        }

        console.log(`Опа ${stdout}`);

    })
}


export { changeBright }