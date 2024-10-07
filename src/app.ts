import express, { Request, Response } from "express"
import handleSocketIO from "./services/socket-Services";

const server = express();

// load body
server.use(express.json());

server.get("/", (req: Request, res: Response)=>{
    res.send("<h1>Hello World!</h1>")
})

const expressServer=server.listen(4000, ()=>{
    console.log("Listening on http://localhost:4000");
})
handleSocketIO(expressServer);
