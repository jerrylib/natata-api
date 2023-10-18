// === Utils === //
import getMysqlInstance from '@/utils/mysqlFactory'
import isEmpty from 'lodash/isEmpty'

export default async function handler(req, res) {
    res.status(200).json([]);
    if (req.method === 'GET') {
        // create the connection
        const connection = await getMysqlInstance();
        if (isEmpty(req.query)) {
            // query database
            const [rows, fields] = await connection.execute('SELECT * FROM `T_USER`', []);
            res.status(200).json(rows);
        } else {
            // query database
            const [rows, fields] = await connection.execute('SELECT * FROM `T_USER` WHERE `name` = ?', [req.query.name]);
            res.status(200).json(rows);
        }
        return
    }

    if (req.method === 'POST') {
        const { body } = req
        const connection = await getMysqlInstance();
        const aaa = await connection.execute('INSERT INTO T_USER (name, avatar, wx_open_id,status) VALUES(?,?,?,?)', [body.name, body.avatar, body.wx_open_id, 0], (error,
            results) => {
            if (error) return res.json({ error: error });

        })
        await connection.commit()

        res.status(200).json({ message: 'ok' });
        return
    }
    if (req.method === 'PUT') {
        res.status(200).json({ message: 'todo' });
        return
    }
    res.status(200).json({ message: 'todo' });
}
