import express, { NextFunction, Request,  Response } from "express";
import auth from "../2-utils/auth";
import config from "../2-utils/config";
import verifyAdmin from "../3-middleware/verify-admin";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import FollowerModel from "../4-models/follower-model";
import VacationModel from "../4-models/vacation-model";
import vacationLogic from "../5-logic/vacation-logic";


const router = express.Router();

//--------------------
//get all the vacation with followers for user
router.get("/api/vacations", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const authHeader = request.header("authorization");
        const vacations = await vacationLogic.getAllVacations(authHeader);
        response.json(vacations);
    }
    catch (err: any) {
        next(err);
    }
});
//------------------

//get one vacation
router.get("/api/vacation-by-id/:vacationId", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId;
        const vacation = await vacationLogic.getOneVacation(vacationId);
        response.json(vacation);
    }
    catch (err: any) {
        next(err);
    }
});

//add follower
router.post("/api/vacations/:vacationId/follow", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const authHeader = request.header("authorization");
        const userId = auth.getUserIdFromToken(authHeader);
        const vacationId = +request.params.vacationId;
        const follow = new FollowerModel(userId, vacationId);
        const addedFollow = await vacationLogic.addFollow(follow);
        response.status(201).json(addedFollow);
    }
    catch (err: any) {
        next(err);
    }
});

//delete follower
router.delete("/api/vacations/:vacationId/unfollow", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const authHeader = request.header("authorization");
        const userId = auth.getUserIdFromToken(authHeader);
        const vacationId = +request.params.vacationId;
        const deleteFollow = new FollowerModel(userId, vacationId);
        await vacationLogic.deleteFollow(deleteFollow);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

//get all the vacations by Admin 
// router.get("/api/vacations", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
//     try {
//         const vacations = await vacationLogic.getVacations();
//         response.json(vacations);
//     }
//     catch (err: any) {
//         next(err);
//     }
// });

//update vacation by Admin only
router.put("/api/vacations/:vacationId", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image;
        const vacationId = +request.params.vacationId;
        request.body.vacationId = vacationId;
        const vacation = new VacationModel(request.body);
        const updatedVacation = await vacationLogic.updateVacation(vacation);
        response.status(203).json(updatedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

//add vacation by Admin only
router.post("/api/vacations", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const addedVacation = await vacationLogic.addVacation(vacation);
        response.status(201).json(addedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

//delete vacation by Admin only
router.delete("/api/vacations/:vacationId", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId;
        await vacationLogic.deleteVacation(vacationId);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;
