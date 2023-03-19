import { createSlice } from "@reduxjs/toolkit";

export interface onlineUser {
  username: string;
  socketId: string;
  coords: {
    lng: number;
    lat: number;
  };
  myself?: boolean;
}

export interface mapState {
  myLocation: {
    lat: number;
    lng: number;
  } | null;
  onlineUsers: onlineUser[];
  cardChosenOption: null;
}

const initialState: mapState = {
  myLocation: null,
  onlineUsers: [],
  cardChosenOption: null,
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setMyLocation: (state, action) => {
      state.myLocation = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    removeDisconnectedUser: (state, action) => {
      state.onlineUsers = state.onlineUsers.filter(
        (onlineUser) => onlineUser.socketId !== action.payload
      );
    },
    setCardChosenOption: (state, action) => {
      state.cardChosenOption = action.payload;
    },
  },
});

export const {
  setMyLocation,
  setOnlineUsers,
  removeDisconnectedUser,
  setCardChosenOption,
} = mapSlice.actions;

export default mapSlice.reducer;
