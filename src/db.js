import pg from 'pg'

export const pool = new pg.Pool({
    user: "postgres",
    host: "127.0.0.1",
    password: "Holamundo123",
    database: "postgres",
    port:"5432"
})