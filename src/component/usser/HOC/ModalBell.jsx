import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { valueSearch } from "../../../redux/couterSlice/couterSlice";
import { Navigate } from "react-router-dom";

function ModalBell() {
    const variableTaskAll = useSelector((store) => store.counter.taskAll);
    const variableTaskUnFinish = variableTaskAll.filter((task) => task.attributes.complete === false);
    const dispatch = useDispatch();
    function handleItemBell(e) {
        dispatch(valueSearch(e));
        <Navigate to={"/"} />;
    }
    return (
        <div className="bg-slate-300 fixed w-[200px] top-[55px] right-3 rounded-md z-10 overflow-auto max-h-[400px] ">
            <ul>
                {variableTaskUnFinish.map((titleTask) => {
                    return (
                        <li
                            key={titleTask.id}
                            className="px-3 py-1 hover:bg-slate-400 hover:text-white"
                            onClick={() => {
                                handleItemBell(titleTask);
                            }}
                        >
                            {titleTask.attributes.title}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default ModalBell;
