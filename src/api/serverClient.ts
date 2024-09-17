import axios from "axios";
import { ServerType } from "../types/serverType";

const BASE_URL = "http://localhost:4000/api/";

export async function fetchAllServers(): Promise<ServerType[] | void> {
    try {
        const res = await axios.get(BASE_URL + "servers");
        return res.data;
    } catch (error) {
        console.log(error);        
        alert("Some error. sorry. retry latter");  
    }
}

export async function updateActive(id: number, newStatus: "active" | "inactive"): Promise<void> {
    try {
        const res = await axios.post(BASE_URL + "server/status", {
            id,
            status: newStatus,
        });
        if (res.status === 200) {
            console.log("Status updated!!!", res.data);
        } else {
            alert("Failed to update status. Please try again later...");
        }
    } catch (error) {
        console.log("Error updating status:", error);
        alert("Error updating status...");
    }
}