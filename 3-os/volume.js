import loudness from "loudness";
import { changeBright } from "./exec.js";

const vol = await loudness.getVolume()
console.log("Громкость", vol);
let lastVolume = await loudness.getVolume();
setInterval(async () => {
    const currentVolume = await loudness.getVolume();
    if(currentVolume !== lastVolume) {
        console.log("Громкость изменилась:", currentVolume);
        changeBright(currentVolume)
        lastVolume = currentVolume;
    }
}, 1000);