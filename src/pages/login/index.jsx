import React, { useRef, useState } from 'react'
import './index.less'
import { message, Form, Input, Button, Checkbox } from 'antd';
import { useHistory } from 'react-router-dom';
import Draggable from 'react-draggable';
import { login } from '../../api/ajax'

// 表单的样式间距配置
const layout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 10,
        span: 16,
    },
};


// 登录界面
function Login() {
    let history = useHistory();
    let formRef = useRef(null);

    // 登录
    const onFinish = async () => {
        console.log('用户名和密码:', formRef.current.getFieldsValue(true));
        let { username, password } = formRef.current.getFieldsValue(true);
        let data = { username, password };
        const loginRes = await login(data);
        console.log("登录：", loginRes);
        if (loginRes.data.code) {
            sessionStorage.setItem('user', JSON.stringify(loginRes.data.data));
            history.replace('/admin');
        } else if (loginRes.data.message === '密码不正确') {
            message.error('密码不正确');
        } else {
            message.error('用户名不存在');
        }
    }



    return (
        <div className="login">
            {/* <img src='assets/bg01.jpg' alt="" className="common bg" /> */}
            <video src="assets/table.mp4" className="common bg" loop autoPlay="autoplay" muted></video>

            <Draggable>
                <section className='form-field' id="form-field">

                    <div className='title'>
                        <p className='main-title'>商品管理系统</p>
                        <p className='sub-title'>提供更便捷、更快速的商品管理UI</p>
                        <div className='filter'></div>
                    </div>

                    <Form
                        ref={formRef}
                        {...layout}
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="账号"
                            name="username"
                            rules={[
                                {
                                    whitespace: true,
                                    required: true,
                                    message: '用户名不能为空',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[
                                {
                                    whitespace: true,
                                    required: true,
                                    message: '密码不能为空',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                登录
    </Button>
                        </Form.Item>
                    </Form>
                </section>
            </Draggable>
        </div>
    )
}

export default Login

