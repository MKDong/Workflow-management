import { Button, Input, Modal, DatePicker, Space } from "antd";
import { useState } from "react";
import { postAddValue } from "../../../service/getAllApi";
import { useDispatch } from "react-redux";
import { reRender } from "../../../redux/couterSlice/couterSlice";
import { modalLogin } from "../../../redux/couterSlice/UserSlice";
import "./ModalAdd.sass";
const ModalApp = () => {
  const [modal2Open, setModal2Open] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

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
    dispatch(reRender());
  };

  function handleOpenModalLogin() {
    if (token) {
      setModal2Open(true);
    } else {
      dispatch(modalLogin(true));
    }
  }

  const onChange = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  };
  const onOk = (value) => {
    console.log("onOk: ", value);
  };

  return (
    <>
      <Button
        className="bg-blue-500"
        type="primary"
        onClick={() => {
          handleOpenModalLogin();
        }}>
        Add Task
      </Button>
      <Modal
        title="Add Task"
        centered
        open={modal2Open} // use "open" instead of "open"
        onOk={() => {
          handleAddValue();
        }}
        onCancel={() => setModal2Open(false)}
        okText="Add"
        okButtonProps={{ className: "my-ok-button" }}>
        <Input
          className="focus:group-target:"
          placeholder="Title"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          // handle input change and update state
        />
          <DatePicker className="input-date-done-task w-[100%] mt-3" showTime onChange={onChange} onOk={onOk} />
      </Modal>
    </>
  );
};
export default ModalApp;
