import { useEffect, useState } from "react";
import { serversTypes } from "./types/serversTypes";
import { getServers } from "./api/server";
import Serverlist from "./Serverlist/Serverlist";


function App() {
    const [servers, setServers] = useState<serversTypes[]>([])

    useEffect(() => {
        getServers().then((res: serversTypes[] | void) => {
            // console.log(res);
            if (res) {
                setServers(res)
            }

        })
    }, [])

    const toggleOnline = (id: number)=> {
       const newServers = servers.map(servers => 
        servers.id === id ? { ...servers, statusOnline: !servers.statusOnline} : servers
          );
    setServers (newServers)

    }

 

    return (
        <div>
            <h1> Hello To Pango </h1>
            {servers.map((p) => { return <Serverlist key={p.id} server={p} toggleOnline = {toggleOnline}/> })}

        </div>
    );
}

export default App;