export const environments = {
    database: {
        connectionLimit: 10,
        host: 'localhost',
        user: process.env.DBUSER || 'root',
        password: process.env.DBPASS || '',
        // database: 'tscbit_matilde',
        database: 'krusty_machine',
        timezone: 'utc'
    },
}