import {Socket, io} from "socket.io-client"

class SocketService {
    socket: Socket | undefined;

    async connect(setMsgs: any, username: string){

        this.socket = io("http://localhost:4000", {query: {username}});

        this.socket.on("server-msg", (data: {msg: string, username: string})=>{
            console.log("new server message arrived! " + data.msg); 
            
            setMsgs((prev: string[])=>{return [...prev, data.username + ": " + data.msg]})
        })
    }
    async send(msg: string){
        this.socket?.emit("client-msg", msg)
    }

    async disconnect(){
        this.socket?.disconnect();
        this.socket = undefined;
    }
}

const socketService = new SocketService();
export default socketService;