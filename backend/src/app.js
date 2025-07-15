import express from "express";
import { createServer } from "node:http";

import { Server } from "socket.io";

import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./routes/users.routes.js";

const app = express();

const server = createServer(app);
// const io = new Server(server);
const io = connectToSocket(server);

app.set("port", (process.env.PORT || 8000));
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));
app.use("/api/v1/users", userRoutes);

// app.get("/home",(req,res) => {
//     return res.json({"hello" : "World"});
// });

const start = async () => {

     const connectionDb = await mongoose.connect("mongodb+srv://sharmatanmay4002:OnS6TBb13ITgk9yb@zoomclonecluster.bk8llrg.mongodb.net/?retryWrites=true&w=majority&appName=ZoomCloneCluster");
     console.log(`MONGO Connected DB Host : ${connectionDb.connection.host}`);

    // app.listen(8000 , () => {
    //     console.log("LISTENING ON PORT 8000");
    // });
       server.listen(app.get("port"), () => {
        console.log("LISTENINg ON PORT 8000")
    });
}

start();