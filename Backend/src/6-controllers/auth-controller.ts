import express, { NextFunction, Request, Response } from "express";
import CredentialsModel from "../4-models/credentials-model";
import UserModel from "../4-models/user-model";
import authLogic from "../5-logic/auth-logic";

const router = express.Router();

router.post("/api/auth/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
       const user = new UserModel(request.body);
       const token = await authLogic.register(user);
       response.status(201).json(token);
    }
    catch (err: any) {
        next(err);
    }
});

router.post("/api/auth/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
       const credentials = new CredentialsModel(request.body);
       const token = await authLogic.login(credentials);
       response.json(token);
    }
    catch (err: any) {
        next(err);
    }
});


router.get("/api/auth/:username", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const exists = await authLogic.usernameExists(request.params.username);
        response.json(exists);
    }
    catch (err: any) {
        next(err);
    }
});


export default router;
