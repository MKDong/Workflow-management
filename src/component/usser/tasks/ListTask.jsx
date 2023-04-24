import React, { useEffect, useState } from "react";
// import { NavLink } from 'react-router-dom'
import { Table } from "antd";
import { deleteTask, getAllListask } from "../../../service/getAllApi";
import { useDispatch, useSelector } from "react-redux";
import View from "../HOC/View";
import { listTaskAll } from "../../../redux/couterSlice/couterSlice";
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

    useEffect(() => {
        async function fetchListTask() {
            const query = `api/tasks?pagination[page]=${current}&pagination[pageSize]=${pageSize}`;
            const res = await getAllListask(query);
            dispatch(listTaskAll(res.data.data));
            setTaskList(res.data.data);
            setTotal(res.data.meta.pagination.total);
            if (variableSearch) {
                setTaskList([variableSearch]);
            }
        }
        fetchListTask();
    }, [current, dispatch, pageSize, variableSearch]);

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
    };

    const columns = [
        {
            title: "`?",
            dataIndex: "check",
            render: (text, record) => <input type="checkbox" checked={record.complete} />,
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
            render: (text, record) => (record.attributes.complete === true ? "true" : "false"),
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
                            onClick={() => handleDelete(record.id)}
                        >
                            Delete
                        </button>
                        {/* <Delete handleDelete={() => handleDelete(record.id)} /> */}
                    </>
                );
            },
        },
    ];

    return (
        <div>
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
