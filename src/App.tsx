import { useEffect, useState } from "react";
import { fetchAllParks } from "./api/park-client";
import { parkTypes } from "./types/parkTypes";
import Park from "./components/park/Park";

function App() {
    const [parks, setParks] = useState<parkTypes[]>([])

    useEffect(() => {
        fetchAllParks().then((res: parkTypes[] | void) => {
            // console.log(res);
            if (res) {
                setParks(res)
            }

        })
    }, [])

    const toogleTaken = (id: number)=> {
       const newParks = parks.map(park => 
            park.id === id ? { ...park, isTaken: !park.isTaken } : park
          );
    setParks (newParks)

    }


<<<<<<< HEAD
   
=======
    

>>>>>>> a391b5420798e83b902f008d40c7c608ad97848d
    return (
        <div>
            <h1> Hello To Pango </h1>
            {parks.map((p) => { return <Park key={p.id} park={p} toogleTaken = {toogleTaken}/> })}

        </div>
    );
}

export default App;
