import { useEffect, useState } from "react";
import { fetchAllParks } from "./api/park-client";
import { parkTypes } from "./types/parkTypes";
import Park from "./components/park/Park";

function App() {
    const [park,setParks] = useState<parkTypes[]>([])

    useEffect(()=>{
       fetchAllParks().then((res: parkTypes[] | void)=>{
        // console.log(res);
        if (res){
        setParks(res)
        }

       })

        // console.log(parks);


    },[])

    return (
        <div>
            <h1> Hello To Pango </h1>
            {/* {park.map((p)=> {return  <p>city:{p.city} - {p.isFree} </p> })} */}
            {park.map((p)=> {return<Park park ={p}/>})}

        </div>
    );
}

export default App;
