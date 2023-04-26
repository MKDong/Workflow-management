import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { changeChecked, deleteTask, getAllListask } from "../../../service/getAllApi";
import { useDispatch, useSelector } from "react-redux";
import View from "../HOC/View";
import { modalLogin, reRender } from "../../../redux/couterSlice/couterSlice";

function ListTask() {
    const [taskList, setTaskList] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const [current, setCurrent] = useState(1);
    const [total, setTotal] = useState(0);
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const variableSearch = useSelector((store) => store.counter.variableSearch);
    // const taskFullRedux = useSelector((store) => store.counter.taskList);
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
            title: "`?",
            dataIndex: "check",
            render: (text, record) => {
                // console.log(record);
                return (
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

    return (
        <div className=" min-h-[450px]">
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
