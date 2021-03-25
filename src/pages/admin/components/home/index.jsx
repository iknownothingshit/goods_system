import React from 'react'
import './index.less'
import { Carousel } from 'antd'

function Home() {
    return (
        <div style={{ textAlign: 'center', fontSize: '30px', fontWeight: 600 }}>
            <h1 className="title" >欢迎使用商品管理系统</h1>
            <section className="swiper">
                <Carousel autoplay={true} effect="fade" className="">
                    <img src="assets/swiper_01.jpg" alt="" />
                    <img src="assets/swiper_02.jpg" alt="" />
                    <img src="assets/swiper_03.jpg" alt="" />
                    <img src="assets/swiper_04.jpg" alt="" />
                </Carousel>
            </section>
            <section className="tip">
                商品管理是指一个零售商从分析顾客的需求入手，对商品组合、定价方法、促销活动，以及资金使用、库存商品和其他经营性指标作出全面的分析和计划，通过高效的运营系统，保证在最佳的时间、将最合适的数量、按正确的价格向顾客提供商品，同时达到既定的经济效益指标。
            </section>
        </div>
    )
}

export default Home
