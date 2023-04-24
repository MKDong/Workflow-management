import React from "react";
import { useSelector } from "react-redux";

function ModalBell() {
    const variableTaskUnFinish = useSelector((store) => store.counter.variablaCountTaskUnFinish);
    return (
        <div className="bg-slate-300 fixed w-[200px] top-[55px] right-3 rounded-md z-10 overflow-hidden">
            <ul>
                {variableTaskUnFinish.map((titleTask) => {
                    return (
                        <li key={titleTask.id} className="px-3 py-1 hover:bg-slate-400 hover:text-white">
                            {titleTask.attributes.title}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default ModalBell;
