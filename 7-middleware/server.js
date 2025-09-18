import express from "express"
import cors from "cors"

const app = express()
const PORT = 6047



// Встроенный middleware — чтобы парсить JSON
app.use(express.json())
app.use(cors({ origin: "*" }))
app.use(express.urlencoded({ extended: true }))




// Кастомный middleware (логгер)
function logger(req, res, next) {
    console.log(`${req.method} ${req.url} at ${new Date().toISOString()}`)
    next()
}

app.use(logger)


// Middleware для проверки токена (пример)
function checkAuth(req, res, next) {
    const token = req.headers["authorization"]
    if (token === "secret123") {
        next()
    } else {
        res.status(401).json({ error: "Нет доступа!" })
    }
}


// Роут с middleware
app.get('/private', checkAuth, (req, res) => {
    res.json({ msg: "приват" })
})



// Обработчик ошибок, глобальный middleware 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Ошибка сервера!");
});




app.listen(PORT, () => {
    console.log(`Success http://localhost:${PORT}`)
})