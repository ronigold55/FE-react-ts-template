import { useReducer, useState } from "react";
import socketService from "../../services/socketService";
import "./Chat.css";

const Chat = () => {
    const [newMsg, setNewMsg] = useState("");
    const [msgs, setMesgs] = useState<string[]>([]);
    const [username, setUsername] = useState("");

    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    const handleConnect = async () => {
        await socketService.connect(setMesgs, username);
        forceUpdate();
    };

    const handleSend = async () => {
        socketService.send(newMsg);
        setNewMsg("");
    };

    const handleDisconnect = async () => {
        socketService.disconnect();
        setUsername("");
        forceUpdate();
    };

    return (
        <div className="chat-container">
            {!socketService.socket && (
                <div className="login-screen">
                    <input
                        className="username-input"
                        value={username}
                        placeholder="Enter your name"
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleConnect()}
                    />
                    <button className="connect-btn" onClick={handleConnect}>
                        Connect
                    </button>
                </div>
            )}

            {socketService.socket && (
                <div className="chat-box">
                    <div className="messages">
                        {msgs.map((msg: string, index: number) => (
                            <div
                                key={index}
                                className={`message-bubble ${msg.startsWith(username) ? "outgoing" : "incoming"
                                    }`}
                            >
                                {msg}
                            </div>
                        ))}
                    </div>

                    <div className="input-container">
                        <input
                            className="message-input"
                            value={newMsg}
                            placeholder="Type a message"
                            onChange={(e) => setNewMsg(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()} 
                        />

                        <button className="send-btn" onClick={handleSend}>
                            Send
                        </button>
                    </div>

                    <button className="disconnect-btn" onClick={handleDisconnect}>
                        Disconnect
                    </button>
                </div>
            )}
        </div>
    );
};

export default Chat;


// import { useReducer, useState } from "react"
// import socketService from "../../services/socketService"

// const Chat = () => {
//     const [newMsg, setNewMsg] = useState("")
//     const [msgs, setMesgs] = useState<string[]>([])
//     const [username, setUsername] = useState("")

//     const [, forceUpdate] = useReducer(x => x + 1, 0)

//     const handleConnect = async () => {
//         await socketService.connect(setMesgs, username);
//         forceUpdate();
//     }

//     const handleSend = async () => {
//         socketService.send(newMsg);
//         setNewMsg("");
//     }

//     const handleDisconnect = async () => {
//         socketService.disconnect();
//         setUsername("");
//         forceUpdate();
//     }
//     return (
//         <div>
//             {!socketService.socket &&
//                 <>
//                     <input value={username} onChange={(e) => { setUsername(e.target.value) }} />
//                     <button onClick={handleConnect}> Connect! </button>
//                 </>}
//             <br />
//             {socketService.socket &&
//                 <>
//                     <button onClick={handleDisconnect}> Disconnect! </button>
//                     <br />

//                     {msgs.map((m: string) => { return <p> {m} </p> })}
//                     <br />

//                     <input value={newMsg} placeholder="enter new message" onChange={(e) => { setNewMsg(e.target.value) }} />
//                     <br />
//                     <button onClick={handleSend}> Send </button>
//                 </>}

//         </div>
//     )
// }

// export default Chat