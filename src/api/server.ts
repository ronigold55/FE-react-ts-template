import axios from "axios";
import { serversTypes } from "../types/serversTypes";


const BASE_URL = "http://localhost:4000/servers";

export async function getServers(): Promise<serversTypes[] | void> {
    try {
        console.log(BASE_URL);
        const res  = await axios.get(BASE_URL) 
        return res.data 
    } catch (error) {
        console.log(error);        
        alert("Some error. sorry. retry latter")        
    }
}

export async function updateOnLine(id: number, newValue: boolean): Promise<void> {
    try {
        const res = await axios.post(`${BASE_URL}/${id}`, {statusOnline:newValue})
        if (res.status !== 200){
            console.log(res);            
            throw new Error("update returned with wrong status");            
        }
    } catch (error) {
        console.log(error);        
        alert("Some error. sorry. retry latter")        
    }
}

