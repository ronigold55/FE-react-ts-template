import { useState } from "react"


const ContactMe = () => {
    const [name, setName] = useState<string>("")    

  return (
    <div>
        <input value={name} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>
                {setName(e.target.value)}} 
                placeholder='name'/>
        <br/>
        <input placeholder='email'/>
        <br/>
        <input placeholder='telephone'/>
        <br/>
    </div>
  )
}

export default ContactMe