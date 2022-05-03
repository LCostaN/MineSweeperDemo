import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isConnected: false,
  helpMessage: "",
  isStarted: false,
  boardMap: [],
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    actionConnected: (state) => {
      state.isConnected = true;
    },
    actionDisconnected: (state) => {
      state.isConnected = false;
      state.isStarted = false;
    },
    actionOnHelp: (state, action) => {
      state.helpMessage = action.payload;
    },
    actionOnMap: (state, action) => {
      state.boardMap = action.payload;
    },
    actionOnOpen: (state, action) => {},
    actionOnStart: (state) => {
      state.isStarted = true;
    },
  },
});

export const {
  actionConnected,
  actionDisconnected,
  actionOnHelp,
  actionOnMap,
  actionOnStart,
} = serviceSlice.actions;

export default serviceSlice.reducer;
