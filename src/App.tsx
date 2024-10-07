import Chat from "./components/chat/Chat";
import socketService from "./services/socketService";

function App() {
    return (
        <div>
            <h1> Welcome to Socket-demo</h1>

            <Chat/>            
        </div>
    );
}

export default App;
