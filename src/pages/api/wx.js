// === Services === //
import { jscode2session } from '@/services/wx'
import { findUserByOpenId } from '@/services/user'

// === Utils === //
import get from 'lodash/get'

export default async function handle(req, res) {

    if (req.method === 'POST') {
        const { body } = req
        const { code } = body
        const resp = await jscode2session(code)
        const users = await findUserByOpenId(resp.data.openid)
        const currentUser = get(users, '0', {
            avatar: 'https://natata-api.vercel.app/logo.png',
            wx_open_id: resp.data.openid,
        })
        res.status(200).json(currentUser);
        return
    }
    res.status(200).json({ message: 'todo' });
}

