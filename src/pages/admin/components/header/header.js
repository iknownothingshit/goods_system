// 注销
export const logout = (Modal, history) => {
    Modal.confirm({
        title: '是否退出当前账号?',
        okText: '确定',
        okType: 'danger',
        cancelText: '算了',
        onOk: () => {
            history.replace('/login');
        }
    })
}

// 获取天气
export const getWeather = async (fetchWeather, setWeather) => {
    const weatherRes = await fetchWeather();
    let type = weatherRes.data.data.forecast[0].type;
    console.log('天气预报:', weatherRes.data.data);
    setWeather(type);
}

// 设置天气图标
export const setWeatherIcon = (weather) => {
    let weatherIcon;
    switch (true) {
        case weather.indexOf('晴') !== -1: weatherIcon = (<img src='assets/sun.png' alt='' />); break;
        case weather.indexOf('云') !== -1 || weather.indexOf('阴') !== -1: weatherIcon = (<img src='assets/overcast.png' alt='' />); break;
        case weather.indexOf('雨') !== -1: weatherIcon = (<img src='assets/rain.png' alt='' />); break;
        default: weatherIcon = (<img src='assets/sun.png' alt='' />);
    }
    return weatherIcon;
}