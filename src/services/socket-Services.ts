import { Server } from "http";
import {Server as SocketServer,Socket}from "socket.io"

export default function handleSocketIO(httpServer:Server):void {

    const options = {cors: {origin:"*"}};

    const socketServer = new SocketServer(httpServer,options);

    socketServer.sockets.on("connection", (socket:Socket)=> {
        console.log("New client connected");

        socket.emit("server-msg","connection established")

        socket.on("New-MSG",(msg:string)=>{
            console.log("new message:" + msg);

            socket.emit("server-msg", "Got it!")
            
        })
        socket.on("disconnect" , () => {
            console.log("client disconnected!");
            
        })
        
    })
}