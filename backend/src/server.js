import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";
import { initSocket } from "./socket.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

const server = http.createServer(app);
initSocket(server);

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
