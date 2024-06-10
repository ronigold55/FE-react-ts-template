import Users from "./components/Users";
import { UserType } from "./types/user-type";


const users : UserType[] = [
    { name: 'David', age: 5 },
    { name: 'Moshe', age: 50 },
    { name: 'Yakov', age: 55 },
    { name: 'Yoni', age: 500 },
    { name: 'Zerach', age: -5 },
]

function App() {
    return (
        <div>
            <h1> Hello React-Typescript template</h1>
            <div>
                <Users users={users}/>
            </div>
        </div>
    );
}

export default App;
