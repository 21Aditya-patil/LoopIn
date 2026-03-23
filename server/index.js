import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import AuthRoute from "./Routes/AuthRoute.js";
import UserRoute from "./Routes/UserRoute.js";
import PostRoute from "./Routes/PostRoute.js";
import EventRoute from "./Routes/EventRoute.js";
import UploadRoute from "./Routes/UploadRoute.js";

import conversationRoutes from "./Routes/ConversationRoute.js";
import messageRoutes from "./Routes/MessagRoute.js";
import searchRoute from "./Routes/SearchRoute.js";

const app = express();

/* ================== MIDDLEWARES ================== */

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({
  origin: [
    process.env.CLIENT_URL,
  ],
  credentials: true,
}));

/* ================== ROUTES ================== */

app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/post", PostRoute);
app.use("/events", EventRoute);
app.use("/upload", UploadRoute);
app.use("/conversation", conversationRoutes);
app.use("/message", messageRoutes);
app.use("/search", searchRoute);

/* ================== SOCKET.IO SETUP ================== */

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      process.env.CLIENT_URL,
    ], // frontend URL
    methods: ["GET", "POST"],
  },
});

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Add user
  socket.on("addUser", (userId) => {
    if (!onlineUsers.some((user) => user.userId === userId)) {
      onlineUsers.push({ userId, socketId: socket.id });
    }
  });

  // Send message
  socket.on("sendMessage", ({ senderId, receiverId, text, conversationId }) => {
    const receiver = onlineUsers.find((user) => user.userId === receiverId);

    if (receiver) {
      io.to(receiver.socketId).emit("getMessage", {
        _id: Date.now().toString(),
        sender: senderId,
        text,
        conversationId,
        createdAt: new Date(),
      });
    }
  });

  // Disconnect
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    console.log("User disconnected");
  });
});

/* ================== DATABASE CONNECTION ================== */

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log(error));
