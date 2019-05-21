import axios from 'axios'

const baseURL = process.env.VUE_APP_BASE_API
console.log('baseURL='+baseURL);

export function getBanner() {
    let url = baseURL+'/banner';
    return axios.get(url);
}

export function getList(page) {
    let url = baseURL + `/list?page=${page}`;
    return axios.get(url);
}

export function getDetail(id) {
    let url = baseURL+`/detail?id=${id}`;
    return axios.get(url);
}

export function getOther() {
    let url = baseURL+'/other';
    return axios.get(url);
}