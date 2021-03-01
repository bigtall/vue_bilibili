import Vue from 'vue'
import router from './src/router/index'
import axios from "axios";
import store from './src/store/index'
const http = axios.create({
    baseURL: 'http://112.74.99.5:3000/web/api'
})

// 请求拦截，配置headers
http.interceptors.request.use(function (config) {
    // Do something before request is sent
    // 接口发送之前配置headers
    if (localStorage.getItem('token') && localStorage.getItem('id')) {
        config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
    }
    store.commit('chagneLoading', true)
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// 响应拦截，配置response
http.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // 接口返回状态码是2xx
    store.commit('chagneLoading', false)
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // 报错的状态码
    store.commit('chagneLoading', false)
    if (error.response.status == 401 || error.response.status == 402) {
        router.push('/login');
        Vue.prototype.$msg.fail(error.response.data.message)
    }


    return Promise.reject(error);
});

export default http;