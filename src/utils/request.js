import axios from 'axios'
import {Toast} from 'mint-ui'

export const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 20*1000
});

export default request = async(url='', type='GET', data={}) {
    let result;
    type = type.toUpperCase();
}