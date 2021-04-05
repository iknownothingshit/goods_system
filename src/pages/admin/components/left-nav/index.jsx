import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'

import './index.less'

function LeftNav() {

    const [curItem, setcurItem] = useState(0);// 当前所处部分编号 0：首页 1：商品管理 2： 商品分类
    const [showGoodsItems, setshowGoodsItems] = useState(false);// 控制商品栏的展开收起 

    const openGoodsItems = () => {
        // 展开商品栏
        setshowGoodsItems(!showGoodsItems);
    }

    const handleItemClick = (id) => {
        // 点击跳转
        setcurItem(id);
    }

    return (
        <div className='left-nav'>
            <div className="head">
                <img src="assets/logo.png" alt="" />
                <p>商品管理</p>
            </div>

            <Link to="/admin/home">
                <section className={curItem === 0 ? "item active" : "item"} onClick={() => handleItemClick(0)}>
                    <img src="assets/home.png" alt="" />
                    <p>首页</p>
                </section>
            </Link>

            <section className="item" onClick={openGoodsItems}>
                <img src="assets/goods.png" alt="" />
                <p>商品</p>
                <img src="assets/arrow.png" alt="" style={{ position: 'absolute', right: '10px', transform: showGoodsItems ? 'rotate(180deg)' : '' }} className="arrow" />
            </section>
            <div className="goods-items" style={{ height: showGoodsItems ? '100px' : '0' }}>
                <Link to="/admin/goods">
                    <div className={curItem === 1 ? "sub-item active" : "sub-item"} style={{ top: showGoodsItems ? '0' : '-50px' }} onClick={() => handleItemClick(1)}>
                        <img src="assets/goodsManage.png" alt="" />
                        <p>商品管理</p>
                    </div>
                </Link>
                <Link to="/admin/category">
                    <div className={curItem === 2 ? "sub-item active" : "sub-item"} style={{ top: showGoodsItems ? '50px' : '-50px' }} onClick={() => handleItemClick(2)}>
                        <img src="assets/goodsClassification.png" alt="" />
                        <p>分类管理</p>
                    </div>
                </Link>
            </div>

            <Link to="/admin/authority">
                <section className={curItem === 3 ? "item active" : "item"} onClick={() => handleItemClick(3)}>
                    <img src="assets/authority.png" alt="" />
                    <p>管理员权限</p>
                </section>
            </Link>

            <Link to="/admin/charts">
                <section className={curItem === 4 ? "item active" : "item"} onClick={() => handleItemClick(4)}>
                    <img src="assets/classification.png" alt="" />
                    <p>图形图表</p>
                </section>
            </Link>
        </div>
    )
}

export default LeftNav
