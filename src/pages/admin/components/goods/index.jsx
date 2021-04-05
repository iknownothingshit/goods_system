import React, { useState, useEffect, useRef } from 'react'
import { Popconfirm, Table, Card, Button, Modal, Space, Input, Select, Descriptions, Image, Form, InputNumber, Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { fetchGoods, confirmDeleteGood, addGoods, handleUploadChange, handleBeforeUpload, getSetStateApi, onOffGood, search } from './goods'
import './index.less'

// 商品管理
function Goods() {
    let userAuthority = JSON.parse(sessionStorage.getItem('user')).authority;
    let formRef = useRef(null);
    const { Option, OptGroup } = Select;

    const [isFormVis, setIsFormVis] = useState(false);// 是否显示添加商品表单框
    const [isDetailVis, setIsDetailVis] = useState(false);// 是否显示商品详情框
    const [tableData, setTableData] = useState([]);// 列表数据
    const [curGood, setCurGood] = useState({});// 当前查看的商品
    const [hasImg, setHasImg] = useState(false);// 是否已上传了照片
    const [seachType, setSeachType] = useState('按名称搜索');// 搜索类型
    const [searchData, setSearchData] = useState([]);// 搜索结果

    useEffect(() => {
        getSetStateApi(setIsFormVis, setIsDetailVis, setTableData, setCurGood, setHasImg, setSearchData);
        fetchGoods(setTableData);
    }, [])

    // 列配置
    const columns = [
        {
            title: '商品名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '商品描述',
            dataIndex: 'describe',
            key: 'describe',
            width: '40%'
        },
        {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
            render: (text, record) => {
                return (<p>{`￥${record.price}`}</p>)
            }
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => {
                return (<p style={{ color: record.status ? 'green' : '' }}>{record.status ? '在售' : '已下架'}</p>)
            }
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            width: '10%',
            render: (text, record, index) => {
                return (
                    <Space size="middle">
                        <Button type="link" onClick={() => {
                            setCurGood(record);
                            setIsDetailVis(true);
                        }}>详情</Button>
                        <Button type="link" className="delete">
                            <Popconfirm title='确定删除此商品？' okText="确定" cancelText='取消' onConfirm={() => confirmDeleteGood(record.key)}>删除</Popconfirm>
                        </Button>
                    </Space>
                )
            }
        },
    ];

    const extra = (
        <Button type="primary" onClick={() => setIsFormVis(true)}>
            <PlusOutlined />
            添加商品
        </Button>
    )

    const detailExtra = userAuthority >= 2 ? (
        <div>
            {/* <Button type="primary" onClick={() => { setIsFormVis(true); setCurAction('修改'); }} style={{ marginRight: '10px' }}>修改</Button> */}
            <Button type="primary" onClick={() => onOffGood(curGood)}>{curGood.status ? '下架' : '上架'}</Button>
        </div>
    ) : null;

    const searchBox = (
        <div>
            <Select style={{ width: '15%', marginRight: '10px' }} value='按名称搜索' onChange={(val) => setSeachType(val)}>
                <Option value='按名称搜索'>按名称搜索</Option>
                <Option value='按描述搜索'>按描述搜索</Option>
            </Select>
            <Input.Search
                style={{ width: '20%' }}
                placeholder="输入关键字..."
                allowClear={true}
                onSearch={(val, e) => search(val, e, tableData, seachType)}
                onInput={(e) => {
                    if (!e.target.value.length) setSearchData([]);
                }} />
        </div>
    )

    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };

    return (
        <div className="category">
            <Modal
                title='商品详情'
                visible={isFormVis}
                okText="确认添加"
                cancelText="取消"
                onCancel={() => setIsFormVis(false)}
                onOk={(e) => addGoods(formRef)}
            >
                <Form
                    ref={formRef}
                    {...formItemLayout}
                    name="addForm"
                    initialValues={{ remember: true }}
                    labelAlign='right'
                >
                    <Form.Item
                        label="商品名称"
                        name="name"
                        rules={[{ required: true, message: '此项不可为空' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="所属分类"
                        name="category"
                        rules={[{ required: true, message: '此项不可为空' }]}
                    >
                        <Select placeholder="选择所属分类">
                            <OptGroup label="手机">
                                <Option value="华为手机">华为手机</Option>
                                <Option value="小米手机">小米手机</Option>
                                <Option value="OPPO手机">OPPO手机</Option>
                                <Option value="VIVO手机">VIVO手机</Option>
                                <Option value="苹果手机">苹果手机</Option>
                                <Option value="三星手机">三星手机</Option>
                            </OptGroup>
                            <OptGroup label="电脑配件">
                                <Option value="u盘">u盘</Option>
                                <Option value="电脑周边">电脑周边</Option>
                                <Option value="硬盘">硬盘</Option>
                                <Option value="支架">支架</Option>
                                <Option value="手写笔">手写笔</Option>
                                <Option value="电池">电池</Option>
                                <Option value="转接口">转接口</Option>
                            </OptGroup>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="状态"
                        name="status"
                        rules={[{ required: true, message: '此项不可为空' }]}
                    >
                        <Select placeholder="选择商品状态">
                            <Option value={1}>在售</Option>
                            <Option value={0}>已下架</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="价格"
                        name="price"
                        rules={[{ required: true, message: '此项不可为空' }]}
                    >
                        <InputNumber min={1} max={1000000} />
                    </Form.Item>
                    <Form.Item
                        label="库存"
                        name="count"
                        rules={[{ required: true, message: '此项不可为空' }]}
                    >
                        <InputNumber min={1} max={1000000} />
                    </Form.Item>
                    <Form.Item
                        label="商品描述"
                        name="desc"
                        rules={[{ required: true, message: '此项不可为空' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item
                        label="商品图片"
                        name="goodsPicture"
                        rules={[{ required: true, message: '此项不可为空' }]}
                    >
                        <Upload
                            accept="image/*"
                            listType="picture-card"
                            onChange={(e) => handleUploadChange(e)}
                            beforeUpload={(info) => handleBeforeUpload(info)}
                        // action='/image/uploadImg'
                        >
                            {hasImg ? null : (
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>上传</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title='商品详情'
                visible={isDetailVis}
                okText="确定"
                cancelText="取消"
                onCancel={() => setIsDetailVis(false)}
                onOk={() => setIsDetailVis(false)}
            >
                <Descriptions title="冰箱" layout="horizonal" column={3} extra={detailExtra}>
                    <Descriptions.Item label="商品名称">{curGood.name}</Descriptions.Item>
                    <Descriptions.Item label="价格">{`￥${curGood.price}`}</Descriptions.Item>
                    <Descriptions.Item label="状态" contentStyle={{ color: curGood.status ? 'green' : '' }}>{curGood.status ? '在售' : '已下架'}</Descriptions.Item>
                    <Descriptions.Item label="所属分类">{curGood.goods_category}</Descriptions.Item>
                    <Descriptions.Item label="商品库存">{curGood.count}</Descriptions.Item>
                    <Descriptions.Item label="月销售量">{curGood.monthly_sales}</Descriptions.Item>
                    <Descriptions.Item label="商品图片" span={3}>
                        <Image src={`images/${curGood.img}`} width='50%' />
                    </Descriptions.Item>
                    <Descriptions.Item label="商品描述" span={3}>{curGood.describe}</Descriptions.Item>
                </Descriptions>
            </Modal>

            <Card title={searchBox} extra={extra}>
                <Table
                    columns={columns}
                    dataSource={searchData.length ? searchData : tableData}
                    bordered={true}
                    pagination={{ defaultPageSize: 5, showQuickJumper: true }}
                />
            </Card>
        </div>
    )
}

export default Goods
