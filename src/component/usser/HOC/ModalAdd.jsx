import { Button, Input, Modal } from "antd";
import { useState } from "react";
import { postAddValue } from "../../../service/getAllApi";
const ModalApp = () => {
    const [modal2Open, setModal2Open] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const handleAddValue = async () => {
        setModal2Open(false);
        let data = JSON.stringify({
            data: {
                title: inputValue,
                date: new Date(),
                complete: true,
            },
        });
        const token = localStorage.getItem("token");
        //call function post in API
        postAddValue(data, token);
    };

    return (
        <>
            <Button className="bg-blue-500" type="primary" onClick={() => setModal2Open(true)}>
                Add Task
            </Button>
            <Modal
                title="Add Task"
                centered
                open={modal2Open} // use "open" instead of "open"
                onOk={() => {
                    handleAddValue();
                }} // use handleSubmit function instead of setModal2Open
                onCancel={() => setModal2Open(false)}
                okText="Add"
                okButtonProps={{ className: "my-ok-button" }}
            >
                <Input
                    className="focus:group-target:"
                    placeholder="Title"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    // handle input change and update state
                />
            </Modal>
        </>
    );
};
export default ModalApp;
