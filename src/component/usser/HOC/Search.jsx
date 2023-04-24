import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import _debounce from "lodash/debounce";
import { getValueSearch } from "../../../service/getAllApi";
import UseDebounce from "./UseDebounce";
import { useDispatch } from "react-redux";
import { valueSearch } from "../../../redux/couterSlice/couterSlice";

function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const [dataSearch, setDataSearch] = useState([]);
    const dispatch = useDispatch();

    const debounceValueSearch = UseDebounce(searchTerm, 1000);

    useEffect(() => {
        const fetchData = async (query) => {
            let res = await getValueSearch(query);
            setDataSearch(res.data.data);
        };
        if (debounceValueSearch) {
            fetchData(debounceValueSearch);
        } else {
            setDataSearch([]);
        }
    }, [debounceValueSearch]);

    const hadleClickItem = (e) => {
        dispatch(valueSearch(e));
    };
    // const handleDebounce = (value) => {
    //     setSearchTerm(value);
    // };

    // useEffect(() => {
    //     handleDataSearch();
    // }, [searchTerm]);

    // const handleDataSearch = async () => {
    //     let res = await getValueSearch(searchTerm);
    //     setDataSearch(res.data.data);
    //     if (!searchTerm) {
    //         setDataSearch([]);
    //     }
    // };

    return (
        <div className=" mt-5">
            <Input
                placeholder=" search task "
                allowClear
                size="large"
                value={searchTerm}
                onChange={(e) => {
                    // handleDebounce(e.target.value);
                    setSearchTerm(e.target.value);
                }}
                addonAfter={
                    <button type="submit" onClick={() => {}}>
                        <SearchOutlined />
                    </button>
                }
            />
            <div className=" w-52 z-10 rounded-md  bg-slate-300 absolute">
                {dataSearch.map((item) => {
                    return (
                        <ul>
                            <li
                                className="hover:bg-gray-600 hover:text-white overflow-hidden p-3"
                                onClick={() => {
                                    hadleClickItem(item);
                                }}
                            >
                                {item.attributes.title}
                            </li>
                        </ul>
                    );
                })}
            </div>
        </div>
    );
}

export default Search;
