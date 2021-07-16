import axios from 'axios'

const http = (obj) => {
    return new Promise((resolve, reject) => {


        // 判断请求方式
        if (obj.api == 'post') {
            axios.post(obj.url,
                    obj.data, {
                        headers: { 'token': localStorage.getItem('token') }
                    })
                .then(res => {
                    var Code = JSON.parse(res.data)
                        // 判断请求状态

                    resolve(Code)
                })
                .catch((err) => {
                    resolve(err)
                });
        } else {
            axios.get(obj.url, {
                    params: obj.data,
                    headers: { 'Token': localStorage.getItem('token') } //设置header信息
                })
                .then(res => {
                    var Code = JSON.parse(res.data)
                        // 判断请求状态

                    resolve(Code)

                })
                .catch((err) => {
                    resolve(err)
                });
        }

    })
}

export default http