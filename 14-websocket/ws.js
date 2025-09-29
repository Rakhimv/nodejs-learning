import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 5555 })

wss.on("connection", (ws) => {
    console.log("новый клиент")


    ws.on("message", (message) => {
        console.log("msg: ", message.toString())

        wss.clients.forEach((client) => {
            if (client.readyState === ws.OPEN) {
                client.send(message.toString())
            }
        })
    })


    ws.on("close", () => {
        console.log("Клиент отключился")
    })
})