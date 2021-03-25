import React from 'react'

import LeftNav from './components/left-nav'
import HeaderBar from './components/header'
import FooterBar from './components/footer'
import Home from './components/home'
import Category from './components/category'
import Goods from './components/goods'
import Charts from './components/charts'

import { Redirect, Route, Switch } from 'react-router-dom'

import './index.less'

import { Layout } from 'antd'
const { Sider, Header, Footer, Content } = Layout;

function Admin() {
    return (
        <Layout className='layout'>
            <Sider collapsible={true}>
                <LeftNav />
            </Sider>
            <Layout>
                <Header style={{ backgroundColor: 'white' }}>
                    <HeaderBar />
                </Header>
                <Content style={{ backgroundColor: 'white', margin: '20px' }}>
                    <Switch>
                        <Route path="/admin/home" component={Home} />
                        <Route path="/admin/category" component={Category} />
                        <Route path="/admin/goods" component={Goods} />
                        <Route path="/admin/charts" component={Charts} />
                        <Redirect to="/admin/home" />
                    </Switch>
                </Content>
                <Footer>
                    <FooterBar />
                </Footer>
            </Layout>
        </Layout>
    )
}

export default Admin