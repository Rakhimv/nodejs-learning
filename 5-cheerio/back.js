import axios from "axios"
import * as cheerio from "cheerio"
import express from "express"


const app = express()
app.use(express.json())

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS")
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
	if (req.method === "OPTIONS") {
		return res.sendStatus(204)
	}
	next()
})

app.get("/nz-times", async (req, res) => {
    const times = await parseSite()
    res.json(times)
})
app.listen(4910, () => console.log("Server is running on port 4910"))



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



        

        return times

    } catch (err) {
        console.log(err)
    }
}


