import axios from 'axios'
import store from './index'


import { Message } from "element-ui";


const http = (obj) => {
    return new Promise((resolve, reject) => {

        store.state.Vuex.loading = true
            // 判断请求方式
        if (obj.api == 'post') {
            axios.post(obj.url,
                    obj.data, {
                        headers: { 'token': localStorage.getItem('token') }
                    })
                .then(res => {


                    // console.log(res)
                    store.state.Vuex.loading = false
                    var Code = JSON.parse(res.data)
                        // 判断请求状态
                    if (Code.Code != 0) {
                        Message({
                            message: Code.Msg,
                            type: "error"
                        });
                        return false
                    }
                    if (Code.Code == 0) {
                        resolve(Code)
                        return false
                    }

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
                    // console.log(res)


                    store.state.Vuex.loading = false
                    var Code = JSON.parse(res.data)
                        // 判断请求状态
                    if (Code.Code != 0) {
                        Message({
                            message: Code.Msg,
                            type: "error"
                        });
                        return false
                    }
                    if (Code.Code == 0) {
                        resolve(Code)
                        return false
                    }

                })
                .catch((err) => {
                    resolve(err)
                });
        }

    })
}

export default http