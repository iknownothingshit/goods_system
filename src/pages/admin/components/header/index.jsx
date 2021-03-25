import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { fetchWeather } from '../../../../api/ajax'
import './index.less'
import { logout, getWeather, setWeatherIcon } from './header.js'
import { Modal } from 'antd'

function Header(props) {
    let history = useHistory();
    const { pathname } = useLocation();

    const [time, setTime] = useState('');// 日期
    const [weather, setWeather] = useState('');// 天气
    const [title, setTitle] = useState('首页');// 标题

    useEffect(() => {
        switch (true) {
            case pathname.indexOf('home') !== -1: setTitle('首页'); break;
            case pathname.indexOf('goods') !== -1: setTitle('商品管理'); break;
            case pathname.indexOf('category') !== -1: setTitle('商品分类'); break;
            case pathname.indexOf('charts') !== -1: setTitle('图形图表'); break;
            default: setTitle('首页');
        }
    }, [pathname]);

    // 设置时间日期并获取天气
    useEffect(() => {
        let interval = setInterval(() => {
            let date = new Date();
            let time = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            setTime(time);
        }, 1000);

        getWeather(fetchWeather, setWeather);

        return function cleanUp() {
            clearInterval(interval);
        }
    }, []);

    return (
        <div className='header'>
            <section className="cur-part">
                <h2>{title}</h2>
            </section>

            <section className="date-weather-logout">
                <div className="date">{time}</div>
                <div className="weather">
                    {setWeatherIcon(weather)}
                    {weather}
                </div>
                <div className="logout">
                    管理员:123
                    <p onClick={() => { logout(Modal, history) }}>注销</p>
                </div>
            </section>
        </div>
    )
}

export default Header
