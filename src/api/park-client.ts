import axios from "axios";
import { parkTypes } from "../types/parkTypes";

const BASE_URL = "http://localhost:4000/park/";

export async function fetchAllParks() : Promise<parkTypes[] | void> {
    try {
        // const res = await axios.get(BASE_URL) as parkTypes[]
        const res = await axios.get(BASE_URL) 
        return res.data
        
    } catch (error) {
        console.log(error);
        alert("some error,retry later")
        // return []
        
    }    
}

export async function updateOccupied(id : number , newValue: boolean ): Promise<void> {

    try {
        const res =await axios.patch(BASE_URL + `/${id}`,{newValue})
        if (res.status !== 200){
            throw new Error("update returned with wrong status ");
            
        }
        
    } catch (error) {
        console.log(error);
        alert("some error,retry later")
        
    }
    
}
