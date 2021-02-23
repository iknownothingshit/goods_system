import React from 'react'

import LeftNav from './components/left-nav'
import HeaderBar from './components/header'
import FooterBar from './components/footer'
import ContentBox from './components/content'

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
                <Header style={{ backgroundColor: 'whitesmoke' }}>
                    <HeaderBar />
                </Header>
                <Content>
                    <ContentBox />
                </Content>
                <Footer>
                    <FooterBar />
                </Footer>
            </Layout>
        </Layout>
    )
}

export default Admin