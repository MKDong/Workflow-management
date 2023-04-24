import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { getPopulate } from "../../service/getAllApi";
import { Table } from "antd";
import View from "./HOC/View";
import { useDispatch } from "react-redux";
import { variableTaskUnFinish } from "../../redux/couterSlice/couterSlice";
ChartJS.register(ArcElement, Tooltip, Legend);

const columns = [
    {
        title: "Title",
        dataIndex: "title",
        key: "name",
        render: (text) => <>{text}</>,
    },
    {
        title: "Action",
        key: "action",
        render: (text, record) => {
            return (
                <>
                    <View itemId={record.id} />
                    <button className="border rounded-md px-3 py-1 hover:bg-red-500 ">Delete</button>
                    {/* <Delete handleDelete={() => handleDelete(record.id)} /> */}
                </>
            );
        },
    },
];

function Statistical() {
    const [task, setTask] = useState([]);
    const [statusUnFinish, setStatusUnFinis] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        getAllTask();
    }, []);
    const getAllTask = async () => {
        let res = await getPopulate();
        setTask(res.data.data);
    };
    const taskFinish = task.filter((item) => item.attributes.complete === true);
    const taskUnFinish = task.filter((item) => item.attributes.complete === false);
    dispatch(variableTaskUnFinish(taskUnFinish));

    const data = {
        labels: ["Finish ", "UnFinish"],
        datasets: [
            {
                label: "# of Votes",
                data: [taskFinish.length, taskUnFinish.length],
                backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
                borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
                borderWidth: 1,
            },
        ],
    };
    return (
        <div className=" md:flex md:justify-between">
            <div className="lg:w-[50%]">
                <div>
                    <select
                        onChange={(event) => {
                            const selectedOption = event.target.value;
                            if (selectedOption === "finish") {
                                // console.log("finish");
                                setStatusUnFinis(false);
                            } else if (selectedOption === "unfinish") {
                                // console.log("unfinish");
                                setStatusUnFinis(true);
                            }
                        }}
                    >
                        <option value="finish">Finish Task</option>
                        <option value="unfinish">Unfinish Task</option>
                    </select>
                </div>
                <div>
                    <Table
                        columns={columns}
                        rowKey={(item) => item.id}
                        dataSource={statusUnFinish ? taskUnFinish : taskFinish}
                    >
                        {console.log(taskFinish, taskUnFinish)}
                    </Table>
                </div>
            </div>
            <div className="lg:w-[45%] w-screen">
                <Pie className="w-full" data={data} />
            </div>
        </div>
    );
}

export default Statistical;
