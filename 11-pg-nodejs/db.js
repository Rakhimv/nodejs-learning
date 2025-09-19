import pkg from 'pg'
import { Pool } from 'pg'

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    port: '5432',
    database: 'shop_db'
})

export default pool;