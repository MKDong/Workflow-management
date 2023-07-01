import { Button, Modal } from "antd";
import React, { useState } from "react";
import { getTaskById, putTask } from "../../../service/getAllApi";
import { reRender } from "../../../redux/couterSlice/couterSlice";
import { modalLogin } from "../../../redux/couterSlice/UserSlice";
import { useDispatch } from "react-redux";
import Login from "../../auth/Login";

function View(props) {
    const [modalViewOpen, setModalViewOpen] = useState(false);
    const [taskDetail, setTaskDetail] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState("");
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");

    const getDetailTask = async () => {
        let res = await getTaskById(props.itemId);
        setTaskDetail([res.data.data]);
    };
    // console.log(taskDetail);

    const handleEditTask = () => {
        setEditMode(false);
        let data = JSON.stringify({
            data: {
                title: title,
                date: new Date(),
                complete: true,
            },
        });
        console.log(props.itemId, title);
        const token = localStorage.getItem("token");
        putTask(props.itemId, data, token);
        dispatch(reRender());
    };

    function handleCheckLogin() {
        if (!token) {
            dispatch(modalLogin(true));
        } else {
            const token = localStorage.getItem("token");
            token ? setModalViewOpen(true) : <Login />;
            getDetailTask();
        }
    }

    return (
        <>
            <Button
                className="border rounded-md me-3 px-3 py-1 hover:bg-green-500 "
                onClick={() => {
                    handleCheckLogin();
                }}
            >
                View
            </Button>
            <Modal
                centered
                open={modalViewOpen}
                onCancel={() => {
                    setModalViewOpen(false);
                    setEditMode(false);
                }}
                footer={[
                    editMode ? (
                        <>
                            <Button
                                className="bg-green-400"
                                key="edit"
                                onClick={() => {
                                    handleEditTask();
                                }}
                            >
                                Submit
                            </Button>
                            ,
                            <Button className="bg-red-400" key="cancel" onClick={() => setModalViewOpen(false)}>
                                Cancel
                            </Button>
                            ,
                        </>
                    ) : (
                        <>
                            <Button className="bg-green-400" key="edit" onClick={() => setEditMode(true)}>
                                Edit Task
                            </Button>
                            ,
                            <Button className="bg-red-400" key="cancel" onClick={() => setModalViewOpen(false)}>
                                Cancel
                            </Button>
                            ,
                        </>
                    ),
                ]}
            >
                {
                    // console.log(taskDetail);
                    taskDetail.map((item) => {
                        return editMode ? (
                            <div key={item.id}>
                                <h1 className="text-2xl font-bold text-center mb-4">Edit Task</h1>
                                <form>
                                    <div>
                                        <label className="mr-3">Title :</label>
                                        <input
                                            className="border px-2"
                                            // value={item.attributes.title}
                                            onChange={(e) => {
                                                setTitle(e.target.value);
                                            }}
                                        />
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div key={item.id}>
                                <h1 className="text-2xl font-bold text-center">Task Detail</h1>
                                <ul>
                                    <li> Title: {item.attributes.title}</li>
                                    <li> Status: {item.attributes.complete + ""}</li>
                                    <li> Title: {item.attributes.createdAt}</li>
                                    <li> Title: {item.attributes.updatedAt}</li>
                                </ul>
                            </div>
                        );
                    })
                }
            </Modal>
        </>
    );
}

export default View;
