import EventEmitter from "events";

const emitter = new EventEmitter()
emitter.on("ping", () => {
    console.log("pong");
})

emitter.emit("ping")