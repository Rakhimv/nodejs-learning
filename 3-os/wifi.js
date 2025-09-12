import wifi from "node-wifi"

wifi.init({ iface: null })
wifi.getCurrentConnections((err, current) => {
    if (err) console.error("Ошибка подключений:", err);
    else console.log("Текущие подключения:", current);
});

wifi.scan().then(networks => {
    console.log(networks);
})

