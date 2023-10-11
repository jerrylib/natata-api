const mysql = require('mysql2/promise');

let connection
export default async function getMysqlInstance() {
    if (connection) {
        return connection
    }
    const url = process.env.DATABASE_URL
    if (url === undefined || url === '') {
        throw new Error('DATABASE_URL unset!')
    }
    console.log('url=', url)
    // create the connection
    connection = await mysql.createConnection(url);
    return connection
}