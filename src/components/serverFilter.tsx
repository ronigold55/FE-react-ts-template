import React, { useState, useEffect } from 'react'
import { serversTypes } from '../types/serversTypes';


type Props = {
    servers: serversTypes[];
    // setFilteredservers: (servers: ParkType[]) => {};
    setFilteredServers: any;
}

function getCities(servers: serversTypes[]): string[] {
    let cities: string[] = [];
    for (const p of servers) {
        if (!cities.includes(p.city)) {
            cities.push(p.city)
        }
    }
    return cities
}

const FilterHeader = (props: Props) => {
    const [onlylAvailable, setOnlyAvailble] = useState<boolean>(false);
    const [city, setCity] = useState<string>("")

    useEffect(() => {
        let filteredservers = props.servers;
        if (onlylAvailable)
            filteredservers = filteredservers.filter((p) => { return !p.statusOnline });
        if (city !== "") {
            filteredservers = filteredservers.filter((p) => { return p.city === city });
        }

        props.setFilteredservers(filteredservers);
    }, [onlylAvailable, city])


    const handleOnlyAvailble = () => {
        setOnlyAvailble((prev) => !prev);
    }

    return (
        <div>
            <label> Show only available</label>
            <input type='checkbox' checked={onlylAvailable} onChange={handleOnlyAvailble} />
            <br />
            <label> Filter by city</label>
            <select name="cities" id="cars" onChange={(e) => { setCity(e.target.value) }}>
                <option value={""} onChange={()=>{setCity("")}}> ALL </option>
                {getCities(props.servers).map((c) => { return <option value={c}> {c} </option> })}
            </select>
        </div>
    )
}

export default FilterHeader