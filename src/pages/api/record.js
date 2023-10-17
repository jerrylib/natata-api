// === Utils === //
import sumBy from 'lodash/sumBy'
import some from 'lodash/some'
import isString from 'lodash/isString'
import isNumber from 'lodash/isNumber'
import getMysqlInstance from '@/utils/mysqlFactory'

export async function record(req, res) {
    if (req.method === 'GET') {
        console.log('get call')
        // create the connection
        const connection = await getMysqlInstance();
        // query database
        const [rows, fields] = await connection.execute('SELECT * FROM `T_RECORDS`', []);
        res.status(200).json(rows);
        return
    }

    if (req.method === 'POST') {
        try {
            valid(req)
        } catch (error) {
            console.error('error=', error)
            res.status(400).json({ message: error.message });
            return
        }
        const { body } = req
        const connection = await getMysqlInstance();
        const groupId = Date.now()
        console.log('groupId=', groupId, body)
        body.forEach(element => {
            const { name, score } = element
            connection.query('INSERT INTO T_RECORDS (name, score, group_id) VALUES(?,?,?)', [name, score, groupId], (error,
                results) => {
                if (error) return res.json({ error: error });

            });
        });

        res.status(200).json({ message: 'ok' });
        return
    }
}

function valid(req) {
    const { body } = req
    if (!Array.isArray(body)) {
        throw new Error('Array type!')
    }
    if (some(body, i => !isString(i.name)) || some(body, i => !isNumber(i.score)) || sumBy(body, i => i.score) !== 0) {
        throw new Error('Invalid values!')
    }
    return body
}

export default record