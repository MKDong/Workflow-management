import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    user: {
        email: "",
        password: "",
    },
    valueInputAdd: "",
    taskList: [],
    variableSearch: null,
    variablaCountTaskUnFinish: null,
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
        variableTaskUnFinish: (state, action) => {
            state.variablaCountTaskUnFinish = action.payload;
        },
    },
});

export const { doLoginAction, doLogout, AddValue, valueSearch, listTaskAll, variableTaskUnFinish } =
    counterSlice.actions;

export default counterSlice.reducer;
