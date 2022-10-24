import { createStore } from "redux";
import VacationModel from "../Models/VacationModel";

//1. state
export class VacationState {
    public vacations: VacationModel[] = [];
}

//2. enum ActionType
export enum VacationActionType {
    FetchVacations = "FetchVacations",
    AddVacation = "AddVacation",
    UpdateVacation = "UpdateVacation",
    DeleteVacation = "DeleteVacation",
    Follow = "FollowVacation",
    UnFollow = "UnFollowVacation",
    ResetVacations = "ResetVacations"
}

//3. interface Actin object
export interface VacationAction {
    type: VacationActionType,
    payload: any
}

//4. reducer function
export function vacationReducer(currentState = new VacationState(), action: VacationAction): VacationState {

    const newState = { ...currentState };
    switch (action.type) {

        case VacationActionType.FetchVacations:
            newState.vacations = action.payload
            break;

        case VacationActionType.AddVacation:
            newState.vacations.push(action.payload)
            newState.vacations.sort((a, b) => {
                const aDate = new Date(a.arrivalDate);
                const bDate = new Date(b.arrivalDate);
                return aDate > bDate  ? 1 : -1});
            break;

        case VacationActionType.UpdateVacation:          
            const indexToUpdate = newState.vacations.findIndex(v => v.vacationId === action.payload.vacationId);
            if (indexToUpdate >= 0) {
                newState.vacations[indexToUpdate] = action.payload
            }
            break;

        case VacationActionType.DeleteVacation:
            const indexToDelete = newState.vacations.findIndex(v => v.vacationId === action.payload)
            if (indexToDelete >= 0) {
                newState.vacations.splice(indexToDelete, 1)
            }
            break;

        case VacationActionType.Follow: // action.payload >>=> id of new follow
            const fIndexToUpdate = newState.vacations.findIndex(f => f.vacationId === action.payload);
            if (fIndexToUpdate >= 0) {
                newState.vacations[fIndexToUpdate].followersCount++;
                newState.vacations[fIndexToUpdate].isFollowed = true;
            }
            break;
            
        case VacationActionType.UnFollow: // action.payload >>=> id of follow to delete
            const fIndexToDelete = newState.vacations.findIndex(f => f.vacationId === action.payload);
            if (fIndexToDelete >= 0) {
                newState.vacations[fIndexToDelete].followersCount--;
                newState.vacations[fIndexToDelete].isFollowed = false;
            }
            break;
        
        case VacationActionType.ResetVacations: 
            newState.vacations=[];
            break;
    }

    return newState;
}

//5. vacationStore
export const vacationStore = createStore(vacationReducer);