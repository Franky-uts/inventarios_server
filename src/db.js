/*import pg from 'pg'

export const pool = new pg.Pool({
    connectionString: process.env.POSTGRES_URL, //"postgresql://neondb_owner:npg_sJM87XtBWDiu@ep-twilight-shadow-a43i11yb-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require",
    ssl: {
        rejectUnauthorized: false,
    },
})*/

//Base para Localhost
import pg from 'pg'

export const pool = new pg.Pool({
    user: "postgres",
    host: "localhost",
    password: "Holamundo123",
    database: "postgres",
    port: "5432"
})


export function fecha() {
    const fechaActual = new Date(Date.now());
    const fecha = {
        dia: `${fechaActual.getDate()}-${fechaActual.getMonth() + 1}-${fechaActual.getFullYear()}`,
        hora: `${fechaActual.getHours()}:${fechaActual.getMinutes()}:${fechaActual.getSeconds()}`,
    }
    return fecha;
}

//Base para Docker
/*import pg from 'pg'

export const pool = new pg.Pool({
    user: "postgres",
    host: "db",
    password: "Holamundo123",
    database: "postgres",
    port: "5432"
})*/