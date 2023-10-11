// === Utils === //
import getMysqlInstance from '@/utils/mysqlFactory'

export async function record(req, res) {
    if (req.method === 'GET') {
        console.log('get call')
        // create the connection
        const connection = await getMysqlInstance();
        // query database
        const [rows, fields] = await connection.execute('SELECT * FROM `T_USER`', []);
        console.log('rows, fields=', rows, fields)
        res.status(200).json(rows);
        return
    }

    if (req.method === 'POST') {
        return
    }
}

export default record