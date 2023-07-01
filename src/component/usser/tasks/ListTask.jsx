import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { changeChecked, deleteTask, getAllListask } from "../../../service/getAllApi";
import { useDispatch, useSelector } from "react-redux";
import View from "../HOC/View";
import { reRender } from "../../../redux/couterSlice/couterSlice";
import { modalLogin } from "../../../redux/couterSlice/UserSlice";
import "../HOC/loading.css";
import Loading from "../HOC/Loading";

function ListTask() {
    const [isLoading, setIsLoading] = useState(true);
    const [taskList, setTaskList] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const [current, setCurrent] = useState(1);
    const [total, setTotal] = useState(0);
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const variableSearch = useSelector(
      (store) => store.taskSlice.variableSearch
    );
    // const taskFullRedux = useSelector((store) => store.task.taskList);
    // console.log(variableSearch);
    const reRenderr = useSelector((store) => store.counter.ItemreRender);
    useEffect(() => {
        async function fetchListTask() {
            const query = `api/tasks?pagination[page]=${current}&pagination[pageSize]=${pageSize}`;
            const res = await getAllListask(query);
            setTaskList(res.data.data);
            setTotal(res.data.meta.pagination.total);
            if (variableSearch) {
                setTaskList([variableSearch]);
            }
            setIsLoading(false);
        }
        fetchListTask();
    }, [current, pageSize, variableSearch, reRenderr, token]);

    const onChange = (pagination) => {
        if (pagination && pagination.current !== current) {
            setCurrent(pagination.current);
        }
        if (pagination && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize);
        }
    };

    const handleDelete = (id) => {
        deleteTask(id, token);
        dispatch(reRender());
    };
    const handleCheck = (e, id) => {
        if (!token) {
            dispatch(modalLogin(true));
        } else {
            // console.log(e);
            const { checked } = e.target;
            changeChecked(id, checked, token);
            dispatch(reRender());
        }
    };

    const columns = [
        {
            title: "",
            dataIndex: "check",
            render: (text, record) => {
                const id = `cbx-${record.id}`;
                return (
                    // <div className="container">
                    //     <input
                    //         type="checkbox"
                    //         id={id}
                    //         style={{ display: "none" }}
                    //         onChange={(e) => handleCheck(e, record.id)}
                    //         checked={record.attributes.complete}
                    //     />
                    //     <label htmlFor={id} className="check">
                    //         <svg width="18px" height="18px" viewBox="0 0 18 18">
                    //             <path d="M 1 9 L 1 9 c 0 -5 3 -8 8 -8 L 9 1 C 14 1 17 5 17 9 L 17 9 c 0 4 -4 8 -8 8 L 9 17 C 5 17 1 14 1 9 L 1 9 Z"></path>
                    //             <polyline points="1 9 7 14 15 4"></polyline>
                    //         </svg>
                    //     </label>
                    // </div>

                    <input
                        type="checkbox"
                        onChange={(e) => handleCheck(e, record.id)}
                        checked={record.attributes.complete}
                    />
                );
            },
        },
        {
            title: "Title",
            dataIndex: "title",
            sorter: true,
            render: (text, record) => record.attributes.title,
        },
        {
            title: "Status",
            dataIndex: "status",
            sorter: {
                compare: (a, b) => a.chinese - b.chinese,
                multiple: 3,
            },
            render: (text, record) => (record.attributes.complete === true ? "Finish" : "Un Finish"),
        },
        {
            title: "CreatedAt",
            dataIndex: "createdAt",
            sorter: true,
            render: (text, record) => {
                let createdAt = new Date(record.attributes.createdAt).toLocaleString();
                return <>{createdAt}</>;
            },
        },
        {
            title: "UpdatedAt",
            dataIndex: "updatedAt",
            sorter: true,
            render: (text, record) => {
                let updatedAt = new Date(record.attributes.updatedAt).toLocaleString();
                return <>{updatedAt}</>;
            },
        },
        {
            title: "Date Complete",
            dataIndex: "date",
            sorter: true,
            render: (text, record) => {
                let updatedAt = new Date(record.attributes.date).toLocaleString();
                return <>{updatedAt}</>;
            },
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => {
                return (
                    <>
                        <View itemId={record.id} />
                        <button
                            className="border rounded-md px-3 py-1 hover:bg-red-500 "
                            onClick={() => (token ? handleDelete(record.id) : dispatch(modalLogin(true)))}
                        >
                            Delete
                        </button>
                    </>
                );
            },
        },
    ];

    return isLoading ? (
        <Loading />
    ) : (
        <div className=" min-h-[450px] ">
            {taskList.length === 1 ? (
                <Table columns={columns} dataSource={taskList} onChange={onChange} />
            ) : (
                <Table
                    columns={columns}
                    dataSource={taskList}
                    onChange={onChange}
                    rowKey={(record) => record.id}
                            pagination={{
                        pageSize: pageSize,
                        current: current,
                        total: total,
                        showSizeChanger: true,
                    }}
                />
            )}
        </div>
    );
}

export default ListTask;
