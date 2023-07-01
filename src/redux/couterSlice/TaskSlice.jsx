import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  valueInputAdd: "",
  taskList: [],
  variableSearch: null,
};

export const TaskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    listTaskAll: (state, action) => {
      state.taskList = action.payload;
    },
    AddValue: (state, action) => {
      state.valueInputAdd = action.payload;
    },
    valueSearch: (state, action) => {
      state.variableSearch = action.payload;
    },
  },
});

export const {
    listTaskAll,
    AddValue,
    valueSearch
} = TaskSlice.actions

export default TaskSlice.reducer
