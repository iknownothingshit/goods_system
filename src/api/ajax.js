import axios from 'axios';

const htttp = axios.create({
    timeout: 50000
})

function req(url, method, data) {
    if (method === 'get') {
        return htttp.get(url).then(res => Promise.resolve(res)).catch(err => Promise.reject(err));
    } else {
        return htttp.post(url, data).then(res => Promise.resolve(res)).catch(err => Promise.reject(err));
    }
}

export const fetchWeather = (data) => {
    return req('http://wthrcdn.etouch.cn/weather_mini?city=广州', 'get');
}

export const login = (data) => {
    return req('/user/login', 'post', data);
}

// 新增分类
export const createCategory = (data) => {
    return req('/category/create', 'post', data);
}

// 删除分类
export const destoryCategory = (data) => {
    return req('/category/delete', 'post', data);
}

// 获取分类
export const fetchCategory = () => {
    return req('/category/fetch', 'get');
}

// 修改分类
export const changeCategory = (data) => {
    return req('/category/modify', 'post', data);
}

// 获取商品
export const fetchAllGoods = () => {
    return req('/goods/fetch', 'get');
}

// 上传图片
export const uploadImg = (data) => {
    return req('/image/uploadImg', 'post', data);
}

// 新增商品
export const createGood = (data) => {
    return req('/goods/create', 'post', data);
}

// 删除商品
export const deleteGood = (data) => {
    return req('/goods/delete', 'post', data);
}

// 上/下架商品
export const modifyGood = (data) => {
    return req('/goods/modify', 'post', data);
}

// 获取所有用户
export const getAllUsers = () => {
    return req('/user/fetch', 'get');
}