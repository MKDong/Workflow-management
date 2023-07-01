import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Table } from "antd";
import View from "./HOC/View";
import { useSelector } from "react-redux";
ChartJS.register(ArcElement, Tooltip, Legend);

const columns = [
    {
        title: "Title",
        dataIndex: "attributes",
        key: "title",
        render: (text) => <>{text.title}</>,
    },
    {
        title: "Action",
        key: "action",
        render: (text, record) => {
            return (
                <>
                    <View itemId={record.id} />
                </>
            );
        },
    },
];

function Statistical() {
    const [statusUnFinish, setStatusUnFinis] = useState(false);

    const variableTaskAll = useSelector((store) => store.counter.taskAll);
    const variableTaskUnFinish = variableTaskAll.filter((task) => task.attributes.complete === false);
    const variableTaskFinish = variableTaskAll.filter((task) => task.attributes.complete === true);
    console.log(variableTaskFinish, variableTaskUnFinish);

    const data = {
        labels: ["Finish ", "UnFinish"],
        datasets: [
            {
                label: "# of Votes",
                data: [variableTaskFinish.length, variableTaskUnFinish.length],
                backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
                borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
                borderWidth: 1,
            },
        ],
    };
    return (
      <div className=" md:flex md:justify-between">
        <div className="md:w-[50%]">
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
              }}>
              <option value="finish">Finish Task</option>
              <option value="unfinish">Unfinish Task</option>
            </select>
          </div>
          <div>
            <Table
              columns={columns}
              rowKey={(item) => item.id}
              dataSource={
                statusUnFinish ? variableTaskUnFinish : variableTaskFinish
              }
              pagination={{
                  pageSize: 5,
                  className: 'paginationabc'
              }}></Table>
          </div>
        </div>
        <div className="md:w-[45%] flex justify-center ">
          <Pie className="" data={data} />
        </div>
      </div>
    );
}

export default Statistical;
