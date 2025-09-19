import pool from "./db.js";
import fs from 'fs/promises'

const res = await pool.query("SELECT * FROM orders;")
fs.writeFile('orders.json', JSON.stringify(res.rows))
