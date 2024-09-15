import axios from "axios";
import { parkTypes } from "../types/parkTypes";

const BASE_URL = "http://localhost:4000/park";

export async function fetchAllParks(): Promise<parkTypes[] | void> {
    try {
        console.log(BASE_URL);
        
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching parks:", error);        
        alert("An error occurred while fetching parks. Please try again later.");
    }
}

export async function updateOccupied(id: number, newValue: boolean): Promise<void> {
    try {
        const response = await axios.patch(`${BASE_URL}/${id}`, {isTaken : newValue });
        if (response.status !== 200) {
            console.error("Error updating park:", response);
            throw new Error("Update returned with an unexpected status");
        }
    } catch (error) {
        console.error("Error updating park:", error);
        alert("An error occurred while updating the park. Please try again later.");
    }
}
