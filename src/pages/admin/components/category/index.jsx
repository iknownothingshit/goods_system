import React, { useState, useEffect } from 'react'
import { Table, Card, Button, Modal, Space, Input } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { fetchAllCategories, openModal, closeModal, search, handleOk } from './category'
import './index.less'

// 分类管理
function Category() {

    const [curAction, setCurAction] = useState('查找');// 当前执行的操作: 查找、添加、修改、删除
    const [isActionModalVis, setIsActionModalVis] = useState(false);// 是否显示模态框
    const [keyword, setKeyword] = useState('');// 模态框里输入框的值
    const [tableData, setTableData] = useState();// 列表数据
    const [curSearchData, setCurSearchData] = useState([]);// 当前搜索的列表项
    const [searchKey, setSearchKey] = useState('');// 搜索关键字

    useEffect(() => {
        fetchAllCategories(setTableData);
    }, [])

    // 列配置
    const columns = [
        {
            title: '分类名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            width: '30%',
            render: (text, record, index) => {
                return (
                    <Space size="middle">
                        <Button type="link" onClick={() => openModal('修改', setCurAction, setIsActionModalVis, record)}>修改</Button>
                        <Button type="link" onClick={() => openModal('删除', setCurAction, setIsActionModalVis, record)} className="delete">删除</Button>
                    </Space>
                )
            }
        },
    ];

    const extra = (
        <Button type="primary" onClick={() => openModal('添加', setCurAction, setIsActionModalVis)}>
            <PlusOutlined />
            添加分类
        </Button>
    )

    const searchBox = (
        <Input.Search
            placeholder="查找分类...."
            className="searchBox"
            allowClear={true}
            onSearch={(val, e) => search(val, e, tableData, setCurSearchData)}
            value={searchKey}
            onInput={(e) => {
                setSearchKey(e.target.value);
                if (!e.target.value.length) setCurSearchData([]);
            }}
        />
    )

    return (
        <div className="category">
            <Modal
                title={`${curAction}分类`}
                visible={isActionModalVis}
                okText="确定"
                cancelText="取消"
                onCancel={() => closeModal(setIsActionModalVis)}
                onOk={(e) => handleOk(curAction, keyword, setTableData, setIsActionModalVis, setKeyword)}
            >
                <Input hidden={curAction === '删除'} onInput={(e) => setKeyword(e.target.value)} value={keyword} />
                <p hidden={curAction !== '删除'} style={{ color: 'red' }}>确认删除当前分类吗？</p>
            </Modal>
            <Card title={searchBox} extra={extra}>
                <Table
                    columns={columns}
                    dataSource={curSearchData.length ? curSearchData : tableData}
                    bordered={true}
                    pagination={{ defaultPageSize: 5, showQuickJumper: true }}
                />
            </Card>
        </div>
    )
}

export default Category
