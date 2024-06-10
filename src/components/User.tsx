import { UserType } from "../types/user-type"

type UserProps = {
    user: UserType,    
}

const User = (props: UserProps) => {
  return (
    <div>User : {props.user.name} - {props.user.age}</div>
  )
}

export default User