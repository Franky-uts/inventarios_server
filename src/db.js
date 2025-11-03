import pg from 'pg'

export const pool = new pg.Pool({
    connectionString: process.env.POSTGRES_URL, //"postgresql://neondb_owner:npg_sJM87XtBWDiu@ep-twilight-shadow-a43i11yb-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require",
    ssl: {
        rejectUnauthorized: false,
    },
})

/*import pg from 'pg'

export const pool = new pg.Pool({
    user: "postgres",
    host: "127.0.0.1",
    password: "Holamundo123",
    database: "postgres",
    port: "5432"
})*/