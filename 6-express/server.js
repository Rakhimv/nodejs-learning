import express from "express"
import cors from "cors"

const app = express()
const PORT = 6047
app.use(express.json())
app.use(cors({ origin: "*" }))
app.use(express.urlencoded({ extended: true }))


app.get('/get', (req, res) => {
    res.status(200).json({ nice: true })
})

app.post('/post', (req, res) => {
    const { number } = req.body
    console.log(req.body)
    res.status(200).json({ age: parseInt(number) + 5 })
})


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({err: "Что то пошло не так"})
})


app.listen(PORT, () => {
    console.log(`Success http://localhost:${PORT}`)
})