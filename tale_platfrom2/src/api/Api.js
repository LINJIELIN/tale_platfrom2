import Axios from 'axios'

Axios.defaults.baseURL = 'http://127.0.0.1:8086';
Axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
export default{
//登入
  requestLogin(params){
    alert(2343);
    return Axios.post("/login",params).then(res => res.data)
  },
}
