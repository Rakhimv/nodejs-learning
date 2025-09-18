import axios from "axios"
import * as cheerio from "cheerio"
import fs from "fs/promises"

async function parseSite() {
    try {
        const url = "https://namaz.today/city/petergof"
        const { data } = await axios.get(url)
        const $ = cheerio.load(data)

        const times = []

        $(".time-block .rb").each((i, el) => {
            let nm = "---"
            switch (i) {
                case 0:
                    nm = "Фаджр"
                    break;
                case 1:
                    nm = "Восход"
                    break;
                case 2:
                    nm = "Зухр"
                    break;
                case 3:
                    nm = "Аср"
                    break;
                case 4:
                    nm = "Магриб"
                    break;
                case 5:
                    nm = "Иша"
                    break;
                default:
                    break;
            }


            times.push({
                nm,
                vr: $(el).text()
            })
        });



        

        fs.writeFile("nz.json", JSON.stringify(times)).then(() => console.log("Success")).catch((err) => console.log(err))

    } catch (err) {
        console.log(err)
    }
}



parseSite()