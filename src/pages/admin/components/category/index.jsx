import React, { useState, useEffect } from 'react'
import { Table, Card, Button, Modal, Space, Input, Select } from 'antd'
import { PlusOutlined, WarningOutlined } from '@ant-design/icons'

import { fetchAllCategories, openModal, closeModal, search, handleOk } from './category'
import './index.less'

// 分类管理
function Category() {
    const { Option } = Select;

    const [curAction, setCurAction] = useState('查找');// 当前执行的操作: 查找、添加、修改、删除
    const [isActionModalVis, setIsActionModalVis] = useState(false);// 是否显示模态框
    const [keyword, setKeyword] = useState('');// 模态框里输入框的值
    const [grade, setGrade] = useState(1);// 新增分类的分类等级
    const [belong, setBelong] = useState('');// 新增分类的所属分类名称
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
                        <Button type="link" onClick={() => openModal('修改', setCurAction, setIsActionModalVis, record)} hidden={!!record.children}>修改</Button>
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
                onOk={(e) => handleOk(curAction, keyword, setTableData, setIsActionModalVis, setKeyword, grade, belong)}
            >
                <div style={{ margin: '20px 0', display: 'flex' }} hidden={curAction !== '添加'}>
                    <section>
                        选择分类等级：
                        <Select style={{ marginRight: '20px' }} defaultValue={1} onChange={(val) => setGrade(val)}>
                            <Option value={1}>1级</Option>
                            <Option value={2}>2级</Option>
                        </Select>
                    </section>
                    <section hidden={grade === 1}>
                        选择所属上级分类：
                        <Select defaultValue='数码配件' onChange={(val) => setBelong(val)}>
                            {tableData ? tableData.map((e) => {
                                return (<Option key={e.key} value={e.category_name}>{e.category_name}</Option>)
                            }) : null}
                        </Select>
                    </section>
                </div>
                <div hidden={curAction === '删除'}>
                    <p>输入新的分类名称：</p>
                    <Input onInput={(e) => setKeyword(e.target.value)} value={keyword} />
                </div>
                <p hidden={curAction !== '删除'}>
                    确认删除当前分类吗？
                    <h3 style={{ color: 'red' }}>警告<WarningOutlined />：若当前分类是一级分类，删除此分类将会删除其所有子分类！</h3>
                </p>
            </Modal>
            <Card title='分类列表' extra={extra}>
                <Table
                    columns={columns}
                    dataSource={tableData}
                    bordered={true}
                    pagination={{ defaultPageSize: 5, showQuickJumper: true }}
                />
            </Card>
        </div>
    )
}

export default Category
