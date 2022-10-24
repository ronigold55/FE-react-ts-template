import UserModel from "../Models/UserModel";
import jwtDecode from "jwt-decode";
import { createStore } from "redux";

// 1. state
export class AuthState {
    public token: string = null;
    public user: UserModel = null;

    public constructor () {
        this.token = localStorage.getItem("token");
        if(this.token) {
            const container: { user: UserModel } = jwtDecode(this.token);
            this.user = container.user;
        }
    }
}

// 2. enum actionType
export enum AuthActionType {
    Register,
    Login,
    Logout
}

// 3. interface action object
export interface AuthAction {
    type: AuthActionType,
    payload?: string;
}

// 4. reducer function
export function authReducer(currentState = new AuthState(), action: AuthAction):AuthState {

    const newState = { ...currentState};

    switch(action.type) {

        case AuthActionType.Register:
        case AuthActionType.Login:
            newState.token = action.payload;
            const container: { user: UserModel } = jwtDecode(newState.token);
            newState.user = container.user;
            localStorage.setItem("token", newState.token);
            break;

        case AuthActionType.Logout:
            newState.token = null;
            newState.user = null;
            localStorage.removeItem("token");
        break;      
         
    }

    return newState;
}

// 5. store 
export const authStore = createStore(authReducer);