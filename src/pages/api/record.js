// === Utils === //
import sumBy from 'lodash/sumBy'
import some from 'lodash/some'
import isString from 'lodash/isString'
import isNumber from 'lodash/isNumber'
import getMysqlInstance from '@/utils/mysqlFactory'
import isEmpty from 'lodash/isEmpty'

export async function record(req, res) {
    if (req.method === 'GET') {
        // create the connection
        const connection = await getMysqlInstance();
        if (isEmpty(req.query)) {
            // query database
            const [rows, fields] = await connection.execute('SELECT * FROM `T_RECORDS`', []);
            res.status(200).json(rows);
        } else {
            // query database
            const [rows, fields] = await connection.execute('SELECT * FROM `T_RECORDS` WHERE `name` = ?', [req.query.name]);
            res.status(200).json(rows);
        }
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
        await Promise.all(body.map(element => {
            const { name, score } = element
            return connection.execute('INSERT INTO T_RECORDS (name, score, group_id) VALUES(?,?,?)', [name, score, groupId], (error,
                results) => {
                if (error) return res.json({ error: error });

            });
        }))
        await connection.commit()

        res.status(200).json({ message: 'ok' });
        return
    }
    res.status(200).json({ message: 'ok' });
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