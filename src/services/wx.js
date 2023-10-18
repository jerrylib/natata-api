import axios from 'axios'

export const jscode2session = (code) => {
    return axios.get('https://api.weixin.qq.com/sns/jscode2session', {
        params: {
            appid: process.env.WX_ID,
            secret: process.env.WX_KEY,
            js_code: code,
            grant_type: 'authorization_code',
        },
    })
}