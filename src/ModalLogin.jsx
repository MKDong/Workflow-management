import Link from "antd/es/typography/Link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalLogin } from "./redux/couterSlice/UserSlice";
import { CloseOutlined } from "@ant-design/icons";
import axios from "axios";
import { message } from "antd";

function ModalLogin() {
    const isOpenModal = useSelector((state) => state.counter.openModalLogin);
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin() {
        dispatch(modalLogin(false));
        console.log({ email, password });
        axios
            .post("https://backoffice.nodemy.vn/api/auth/local/", {
                identifier: email,
                password: password,
            })
            .then((res) => {
                localStorage.setItem("token", res.data.jwt);
                // console.log(res.data);
                message.success("Dang nhap thanh cong");
            })
            .catch((err) => {
                message.error("Dang nhap that bai");
            });
    }

    return (
        isOpenModal && (
            <div className="w-full h-full flex bg-black bg-opacity-20 justify-center items-center fixed top-0 left-0 z-20">
                <div className="w-[300px] h-[320px] bg-white rounded-lg relative overflow-hidden">
                    <div>
                        <h1 className="font-bold text-center block text-2xl my-4">LOGIN </h1>
                        <CloseOutlined
                            className="absolute top-2 right-2 hover:bg-red-500 p-2 translate-x-2 translate-y-[-8px]"
                            onClick={() => {
                                dispatch(modalLogin(false));
                            }}
                        />
                    </div>
                    <form className="w-full p-3">
                        <label htmlFor="">Email:</label>
                        <input
                            className="border rounded-md ml-[31px] px-2"
                            type="text"
                            name="email"
                            placeholder="Nhap email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="">Password:</label>
                        <input
                            className="border rounded-md ml-1 mt-7 px-2"
                            type="text"
                            name="password"
                            placeholder="Nhap Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            className="bg-blue-500 hover:bg-sky-700 block mx-auto text-center text-white font-bold my-10 px-10 py-2 rounded-full"
                            onClick={() => {
                                handleLogin();
                            }}
                        >
                            Login
                        </button>
                        <p>
                            Or <Link to={"/register"}>register now!</Link>
                        </p>
                    </form>
                </div>
            </div>
        )
    );
}

export default ModalLogin;
