import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { read, utils, writeFileXLSX } from "xlsx";

function Export() {
    const [pres, setPres] = useState([]);
    const variableTaskAll = useSelector((store) => store.counter.taskAll);
    const wb = read(variableTaskAll);
    const ws = wb.Sheets[wb.SheetNames[0]];
    const data = utils.sheet_to_json(ws);
    setPres(data);
    console.log(pres);

    const exportFile = useCallback(() => {
        const ws = utils.json_to_sheet(pres);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        writeFileXLSX(wb, "Sheettest.xlsx");
    }, [pres]);
    return (
        <div>
            <table>
                <thead>
                    <th>id</th>
                    <th>title</th>
                </thead>
                <tbody>
                    {pres.map((pres) => (
                        <tr>
                            <td>{pres.id}</td>
                            {/* <td>{pres.Index}</td> */}
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <td colSpan={2}>
                        <button onClick={exportFile}>Export XLSX</button>
                    </td>
                </tfoot>
            </table>
        </div>
    );
}

export default Export;
