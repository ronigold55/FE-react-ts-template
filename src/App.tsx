import { useEffect, useState } from "react"


import Park from "./components/park/Park";
import FilterHeader from "./components/filterHeader/FilterHeader";
import { serversTypes } from "./types/serversTypes";

function App() {

    const [servers, setParks] = useState<serversTypes[]>([])
    // const [filteredParks, setFilteredParks] = useState<serversTypes[]>([])

    useEffect(() => {
        fetchParks()
    }, [])

    const fetchParks = async (updateFiltered=true) => {
        const parks = await fetchAllParks()
        if (parks) {
            setParks(parks);            
            // setFilteredParks(parks);
        }
    }

    return (
        <div>
            <h1> Hello To Park Search </h1>
            <FilterHeader parks={parks} setFilteredParks={setFilteredParks}/>
            {filteredParks.map((p) => { return <Park park={p} fetchParks= {fetchParks} /> })}

        </div>
    );
}

export default App;