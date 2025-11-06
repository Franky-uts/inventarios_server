/*import pg from 'pg'

export const pool = new pg.Pool({
    connectionString: process.env.POSTGRES_URL, //"postgresql://neondb_owner:npg_sJM87XtBWDiu@ep-twilight-shadow-a43i11yb-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require",
    ssl: {
        rejectUnauthorized: false,
    },
})*/

//Base para Localhost
/*import pg from 'pg'

export const pool = new pg.Pool({
    user: "postgres",
    host: "localhost",
    password: "Holamundo123",
    database: "postgres",
    port: "5432"
})*/

//Base para Docker
import pg from 'pg'

export const pool = new pg.Pool({
    user: "postgres",
    host: "db",
    password: "Holamundo123",
    database: "postgres",
    port: "5432"
})