import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    user: {
        email: "",
        password: "",
    },
    valueInputAdd: "",
    taskList: [],
    taskAll: [],
    variableSearch: null,
    variablaCountTaskUnFinish: null,
    ItemreRender: true,
};

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        doLoginAction: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        doLogout: (state) => {
            state.isAuthenticated = false;
        },
        listTaskAll: (state, action) => {
            state.taskList = action.payload;
        },
        AddValue: (state, action) => {
            state.valueInputAdd = action.payload;
        },
        valueSearch: (state, action) => {
            state.variableSearch = action.payload;
        },

        taskAllNoPaginition: (state, action) => {
            state.taskAll = action.payload;
        },
        reRender: (state) => {
            return { ...state, ItemreRender: !state.ItemreRender };
        },
    },
});

export const { doLoginAction, doLogout, AddValue, valueSearch, listTaskAll, reRender, taskAllNoPaginition } =
    counterSlice.actions;

export default counterSlice.reducer;
