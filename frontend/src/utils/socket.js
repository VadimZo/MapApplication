import io from "socket.io-client";
import { onlineUsersHandler } from "./socketActions";

let socket = null;

export const connectSocketIOServer = () => {
  socket = io("localhost:5173");

  socket.on("connect", () => {
    console.log("connected to socket server");
  });

  socket.on("online-users", (usersData) => {
    onlineUsersHandler(socket.id, usersData);
  });

  socket.on("user-disconnected", (disconnectedUserSocketId) => {
    userDisconnectedHandler(disconnectedUserSocketId);
  });
};

export const proceedWithLogin = (data) => {
  socket.emit("user-login", data);
};
