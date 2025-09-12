import { exec } from "child_process";

const command = `powershell.exe -Command "(Get-PnpDeviceProperty -KeyName 'DEVPKEY_Device_BatteryLevel' -InstanceId (Get-PnpDevice -FriendlyName '*WH-CH520*' | Select-Object -ExpandProperty InstanceId)).Data"`;

exec(command, (err, stdout, stderr) => {
    if (err) {
        console.error("Ошибка при выполнении команды:", err);
        return;
    }
    if (stderr) {
        console.error("Стандартная ошибка PowerShell:", stderr);
        return;
    }
    
    const batteryLevel = parseInt(stdout.trim());

    if (!isNaN(batteryLevel) && batteryLevel >= 0 && batteryLevel <= 100) {
        console.log(`🔋 Заряд наушников: ${batteryLevel}%`);
    } else {
        console.log("🤷‍♂️ Не удалось получить заряд. Возможно, наушники не подключены или данные недоступны.");
        console.log("Вывод:", stdout);
    }
});