import { UserType } from "../types/user-type";
import User from "./User";

type Props = {
    users: UserType[]
}

const Users = (props: Props) => {
    return (
        <div>
            {props.users.map((user: UserType)=>{
                return <User key={`${user.name}${user.age}`} user={user}/>
            })}
        </div>
    )
}

export default Users