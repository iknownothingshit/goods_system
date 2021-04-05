import React, { useState, useEffect } from 'react'
import { Table, Card, Button, Modal, Space, Input, Select } from 'antd'

import { fetchAllAdmins, closeModal, search, modifyAuthority } from './authority'
import './index.less'

// 用户权限管理
function Authority() {
    let user = JSON.parse(sessionStorage.getItem('user'));
    let { Option } = Select;

    const [isActionModalVis, setIsActionModalVis] = useState(false);// 是否显示模态框
    const [curItem, setCurItem] = useState({});// 当前操作的列表项
    const [tableData, setTableData] = useState();// 列表数据
    const [curSearchData, setCurSearchData] = useState([]);// 当前搜索的列表项
    const [searchKey, setSearchKey] = useState('');// 搜索关键字
    const [newAuthority, setnewAuthority] = useState(0);// 将要修改为的权限等级

    useEffect(() => {
        fetchAllAdmins(setTableData);
    }, [])

    // 列配置
    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '管理员',
            dataIndex: 'admin',
            key: 'admin',
            render: (text, record, index) => {
                return (
                    <div title={record.id === user.admin_id ? '你自己' : ''}>{record.admin}</div>
                )
            }
        },
        {
            title: '权限等级',
            dataIndex: 'authority',
            key: 'authority',
            render: (text, record, index) => {
                return (
                    <Space size="middle">
                        {record.authority}
                        <Button type="link"
                            hidden={user.authority <= record.authority}
                            onClick={() => {
                                setIsActionModalVis(true);
                                setCurItem(record);
                            }}>修改</Button>
                    </Space>
                )
            }
        },
    ];

    const searchBox = (
        <Input.Search
            placeholder="查找管理员...."
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
                title='修改权限'
                visible={isActionModalVis}
                okText="确定"
                cancelText="取消"
                onCancel={() => closeModal(setIsActionModalVis)}
                onOk={(e) => {
                    modifyAuthority(newAuthority, curItem, setTableData);
                    closeModal(setIsActionModalVis);
                }}
            >
                <div className='authority-change'>
                    {`当前权限等级：${curItem.authority} ————>`}
                    <Select style={{ width: '15%', marginLeft: '10px' }} onChange={(val) => setnewAuthority(val)}>
                        <Option value={1}>1</Option>
                        <Option value={2}>2</Option>
                    </Select>
                </div>
            </Modal>
            <Card title={searchBox}>
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

export default Authority
