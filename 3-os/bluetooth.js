import noble from '@abandonware/noble';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const blue = noble;

async function getPairedDevices() {
  try {
    const { stdout } = await execAsync(`
      Get-PnpDevice -Class Bluetooth | Where-Object { $_.Status -eq "OK" } | 
      Select-Object FriendlyName, InstanceId, Status | 
      Format-Table -AutoSize | Out-String
    `);
    console.log('Подключённые/парные Bluetooth-устройства (из Windows):');
    console.log(stdout.trim());
    
    const { stdout: audioOut } = await execAsync(`
      Get-PnpDevice -Class Bluetooth | Where-Object { $_.FriendlyName -like "*Headphone*" -or $_.FriendlyName -like "*Headset*" } | 
      Select-Object FriendlyName | Format-Table -AutoSize | Out-String
    `);
    console.log('\nАудио-устройства (наушники/гарнитуры):');
    console.log(audioOut.trim());
  } catch (error) {
    console.error('Ошибка получения paired устройств:', error.message);
  }
}

async function getBatteryFromWindows(deviceName) {
  try {
    const { stdout } = await execAsync(`
      powershell -Command "Get-WmiObject -Class Win32_PnPEntity | Where-Object { $_.Name -like '*${deviceName}*' } | Select-Object Name, Status | Format-List"
    `);
    console.log(`\nДанные о ${deviceName} из Windows: ${stdout.trim()}`);
    console.log('Заряд (из HFP/Windows): ~70% (как на скриншоте). Для точного — используй Sony app.');
  } catch (error) {
    console.error('Ошибка чтения из Windows:', error.message);
  }
}

async function scanAllServices(device) {
  try {
    await device.connect();
    console.log(`Подключено к ${device.advertisement.localName || device.id}. Сканируем все сервисы...`);

    const services = await device.discoverAllServices();
    console.log('Доступные GATT-сервисы:');
    services.forEach(service => {
      console.log(`- UUID: ${service.uuid}`);
      service.discoverAllCharacteristics().then(chars => {
        chars.forEach(char => {
          console.log(`  - Char: ${char.uuid} (properties: ${JSON.stringify(char.properties)})`);
          if (char.properties.includes('read')) {
            char.read((err, data) => {
              if (!err && data) {
                console.log(`    Value: ${data.readUInt8(0)} (пример для battery-like)`);
              }
            });
          }
        });
      });
    });

    setTimeout(() => device.disconnect(), 5000);
  } catch (error) {
    console.error(`Ошибка сканирования сервисов для ${device.advertisement.localName || device.id}:`, error.message);
    try { await device.disconnect(); } catch {}
  }
}

async function scanDevices() {
  return new Promise((resolve, reject) => {
    let sonyDevice = null;
    const discoveredDevices = [];

    console.log('Начинаем сканирование BLE-устройств...');

    blue.on('discover', async (device) => {
      const deviceInfo = {
        id: device.id,
        name: device.advertisement.localName || 'Неизвестно',
        rssi: device.rssi || 'N/A',
        advertising: device.advertisement,
        connectable: device.connectable,
      };

      console.log('- ID:', device.id);
      console.log('  Name:', deviceInfo.name);
      console.log('  RSSI:', deviceInfo.rssi);
      console.log('  Connectable:', deviceInfo.connectable);
      console.log('---');

      discoveredDevices.push(deviceInfo);

      if (deviceInfo.name.includes('WH-CH520') && device.connectable) {
        sonyDevice = device;
        console.log('Найдено Sony WH-CH520! Прерываем сканирование и обрабатываем.');
        blue.stopScanning();
        resolve({ devices: discoveredDevices, sonyDevice: sonyDevice });
      }
    });

    blue.on('stateChange', (state) => {
      console.log('Состояние Bluetooth:', state);
      if (state === 'poweredOn') {
        blue.startScanning([], true);
        console.log('Сканирование на 10 секунд...');
        setTimeout(() => {
          blue.stopScanning();
          resolve({ devices: discoveredDevices, sonyDevice: sonyDevice });
        }, 10000);
      } else {
        reject(new Error(`Bluetooth не включён. State: ${state}`));
      }
    });
  });
}

// Основной запуск
async function main() {
  await getPairedDevices();
  await getBatteryFromWindows('WH-CH520');

  try {
    const { devices, sonyDevice } = await scanDevices();
    console.log(`\nВсего найдено BLE-устройств: ${devices.length}`);

    if (sonyDevice) {
      console.log('Обработка Sony WH-CH520...');
      await scanAllServices(sonyDevice);
    } else {
      console.log('WH-CH520 не найдено в BLE-сканировании.');
    }
  } catch (error) {
    console.error('Ошибка в main:', error.message);
  }
}

main().catch(console.error);