import React from 'react'
import './index.less'
import { Form, Input, Button, Checkbox } from 'antd';
import { useHistory } from 'react-router-dom';
import Draggable from 'react-draggable';

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

    const onFinish = () => {
        history.push('/admin')
    }



    return (
        <div className="login">
            <img src='assets/bg01.jpg' alt="" className="common bg" />

            <Draggable>
                <section className='form-field' id="form-field">

                    <div className='title'>
                        <p className='main-title'>商品管理系统</p>
                        <p className='sub-title'>提供更便捷、更快速的商品管理UI</p>
                        <div className='filter'></div>
                    </div>

                    <Form
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
                                    required: true,
                                    message: 'Please input your username!',
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
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
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

