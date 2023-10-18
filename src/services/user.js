
// === Utils === //
import getMysqlInstance from '@/utils/mysqlFactory'
import isEmpty from 'lodash/isEmpty';

export const findUserByOpenId = async (openId) => {
    if (isEmpty(openId)) return
    const connection = await getMysqlInstance();
    const [rows, fields] = await connection.execute('SELECT * FROM `T_USER` WHERE `wx_open_id` = ? AND `status` = ?', [openId, 1]);
    return rows
}