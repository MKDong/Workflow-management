import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { doLoginAction } from "../../redux/couterSlice/couterSlice";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onFinish = (values) => {
        // console.log("Received values of form----values: ", values);

        axios
            .post("https://backoffice.nodemy.vn/api/auth/local/", {
                identifier: values.username,
                password: values.password,
            })
            .then((res) => {
                localStorage.setItem("token", res.data.jwt);
                // console.log(res.data);
                message.success("Dang nhap thanh cong");
                navigate("/");
                dispatch(doLoginAction(res.data.user));
            })
            .catch((err) => {
                message.error("Dang nhap that bai");
            });
    };

    return (
        <div className="flex justify-center ">
            <div className="w-80  bg-slate-50 rounded-md p-5 mt-44 bg-opacity-80">
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Username!",
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Password!",
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <NavLink className="login-form-forgot" href="">
                            Forgot password
                        </NavLink>
                    </Form.Item>
                    <Form.Item className="">
                        <Button type="primary" htmlType="submit" className="font-semibold bg-blue-500">
                            Log in
                        </Button>
                        <p>
                            Or <Link to={"register"}>register now!</Link>
                        </p>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default Login;
