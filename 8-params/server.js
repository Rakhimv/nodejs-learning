import express from "express"
import cors from "cors"


const app = express()
const PORT = 6047
app.use(express.json())



app.get('/param1/:id', (req, res) => {
    const { id } = req.params
    res.send(`${id}`)
})

app.get('/param2', (req, res) => {
    const { jojo } = req.query
    res.send(("S = ", jojo))
})



app.listen(PORT, () => {
    console.log(`Success listen http://localhost:${PORT}`)
})


