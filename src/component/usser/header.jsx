/* eslint-disable no-unused-vars */
import { Dropdown, Space } from "antd";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { doLoginAction, doLogout, modalLogin } from "../../redux/couterSlice/couterSlice";
import ModalApp from "./HOC/ModalAdd";
import Search from "./HOC/Search";
import { getMeToken } from "../../service/getAllApi";
import { BellOutlined } from "@ant-design/icons";
import ModalBell from "./HOC/ModalBell";

function Header() {
    const [bell, setBell] = useState(false);
    const user = useSelector((store) => store.counter.user.username);
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");

    useEffect(() => {
        async function getMe() {
            let resUser = await getMeToken(token);
            dispatch(doLoginAction(resUser.data));
        }
        getMe();
    }, [dispatch, token]);

    function handleLogout() {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        dispatch(doLogout());
    }
    const variableTaskAll = useSelector((store) => store.counter.taskAll);
    const variableTaskUnFinish = variableTaskAll.filter((task) => task.attributes.complete === false);
    // console.log(variableTaskAll);

    function handleShowBell() {
        setBell(!bell);
    }

    function handleNavLinkClick() {
        if (!token) {
            dispatch(modalLogin(true));
        }
    }

    const items = [
        {
            label: <a href={"profile"}>Profile</a>,
            key: "0",
        },
        {
            type: "divider",
        },
        {
            label: (
                <a href={"/"} onClick={handleLogout}>
                    Logout
                </a>
            ),
            key: "1",
        },
    ];

    return (
        <div className="fixed top-0 w-full z-10">
            <div className="h-20  bg-gray-300 px-10 flex justify-between ">
                <div className="p-2">
                    <NavLink to={"/"}>
                        <img className="w-32" src="https://todogroup.org/img/logo.svg" alt="" />
                    </NavLink>
                </div>
                <div>
                    <Search className="w-1/3" />
                </div>
                <div className="flex mt-7">
                    <nav className="">
                        <ul className="flex ">
                            <li className="mx-5 hover:underline font-bold">
                                <ModalApp />
                            </li>
                            <li className="mx-5 hover:underline font-bold">
                                <NavLink to={"statistical"} onClick={handleNavLinkClick}>
                                    Statistical
                                </NavLink>
                            </li>
                            <li className="mx-5 hover:underline font-bold">
                                <NavLink>About</NavLink>
                            </li>
                            <li className="w-7">
                                <div
                                    className="relative inline-block"
                                    onClick={() => {
                                        handleShowBell();
                                    }}
                                >
                                    <BellOutlined className="" />
                                    {variableTaskUnFinish && variableTaskUnFinish.length !== 0 && (
                                        <div className="absolute top-[-6px] right-[-9px] w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-bold">
                                            {variableTaskUnFinish.length}
                                        </div>
                                    )}
                                </div>
                            </li>
                        </ul>
                    </nav>
                    <div>
                        <Dropdown menu={{ items }} trigger={["click"]}>
                            <div onClick={(e) => e.preventDefault()}>
                                <Space>
                                    <p>
                                        <b>
                                            {token ? (
                                                <>hello {user}</>
                                            ) : (
                                                <div>
                                                    <NavLink to={"/auth"}>Signin </NavLink> |
                                                    <NavLink to={"auth/register"}> Signup</NavLink>
                                                </div>
                                            )}
                                        </b>
                                    </p>
                                </Space>
                            </div>
                        </Dropdown>
                    </div>
                </div>
                <div>{bell ? <ModalBell /> : []}</div>
            </div>
        </div>
    );
}

export default Header;
