import React from "react"
import { UserType } from "../types/user-type"

type UserProps = {
    user: UserType,    
}

const User = (props: UserProps) => {

    function sayHi(e: React.MouseEvent<HTMLButtonElement>) {
        console.log(e);        
    }
    
    return (
    <div>User : {props.user.name} - {props.user.age}
        <button onClick={sayHi}> Say Hi! </button>
    </div>
  )
}

export default User