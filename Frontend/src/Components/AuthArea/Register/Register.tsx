import { Button, TextField } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Register.css";

function Register(): JSX.Element {

    const {register, handleSubmit, formState} = useForm<UserModel>();
    const navigate = useNavigate();

    const [usernameExists, setUsernameExists] = useState<boolean>();

    async function send(user: UserModel) {
        try{
            const exists = await authService.usernameExists(user.username);
            if (exists) {
                setUsernameExists(true);
                return;
            }
            await authService.register(user);
            notifyService.success(`Welcome ${user.username}!`);
            navigate("/vacations");
        }
        catch (err: any){
            notifyService.error(err);
        }
    }

    return (
        <div className="Register">
			
            <form onSubmit={handleSubmit(send)}>

                <h2>Register</h2>

                <TextField label="First Name" type="text" variant="outlined" className="TextBox" {...register("firstName", {
                    required: {value: true, message: "Missing first name!"},
                    minLength: {value: 2, message: "first name too short"},
                    maxLength: {value: 100, message: "first name too long"}
                })}/>
                <span className="spanMessage">{formState.errors.firstName?.message}</span>

                <TextField label="Last Name" type="text" variant="outlined" className="TextBox" {...register("lastName", {
                    required: {value: true, message: "Missing last name!"},
                    minLength: {value: 2, message: "last name too short"},
                    maxLength: {value: 100, message: "last name too long"}
                })}/>
                <span className="spanMessage">{formState.errors.lastName?.message}</span>

                <TextField label="Username" type="text" variant="outlined" className="TextBox" {...register("username", {
                    required: {value: true, message: "Missing username!"},
                    minLength: {value: 4, message: "username too short"},
                    maxLength: {value: 100, message: "username too long"}
                })}/>
                <span className="spanMessage">{formState.errors.username?.message}</span>
                {usernameExists && <span className="spanMessage">Username is taken</span>}

                <TextField label="Password" type="password" variant="outlined" className="TextBox" {...register("password", {
                    required: {value: true, message: "Missing password!"},
                    minLength: {value: 4, message: "password too short"},
                    maxLength: {value: 100, message: "password too long"}
                })}/>
                <span className="spanMessage">{formState.errors.password?.message}</span>

                <Button type="submit" className="btn" startIcon={<LoginIcon fontSize="medium"/>}>Register</Button>

            </form>

        </div>
    );
}

export default Register;
