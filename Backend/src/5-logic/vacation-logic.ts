import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { IdNotFoundError, ValidationError } from "../4-models/client-errors";
import VacationModel from "../4-models/vacation-model";
import {v4 as uuid} from "uuid";
import safeDelete from "../2-utils/safe-delete";
import FollowerModel from "../4-models/follower-model";
import config from "../2-utils/config";
import auth from "../2-utils/auth";


//get all vacations with followers
async function getAllVacations(authHeader: string): Promise<VacationModel[]> {

    const userId = auth.getUserIdFromToken(authHeader);

    const sql = `SELECT DISTINCT
                    V.*,
                    EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = ?) AS isFollowed,
                    COUNT(F.userId) AS followersCount
                    FROM vacations as V LEFT JOIN followers as F
                    ON V.vacationId = F.vacationId
                    GROUP BY vacationId
                    ORDER BY arrivalDate`;

    const vacations = await dal.execute(sql, [userId]);

    if(!vacations) throw new IdNotFoundError(userId);

    vacations.map(v => v.isFollowed = v.isFollowed ? true : false);

    return vacations;
};


//get one vacation by vacationId
async function getOneVacation(vacationId: number): Promise<VacationModel> {

    const sql = `SELECT * FROM vacations WHERE vacations.vacationId = ? `;

    const vacations = await dal.execute(sql, [vacationId]);

    const vacation = vacations[0];

    if(!vacation) throw new IdNotFoundError(vacationId);

    return vacation;
};


//add follower
async function addFollow(follow: FollowerModel): Promise<FollowerModel> {

    const error = follow.validate();
    if(error) throw new ValidationError(error);

    const sql = `INSERT INTO followers VALUES (?, ?)`;

    await dal.execute(sql, [follow.userId, follow.vacationId]);
    
    return follow;
};

//delete follower
async function deleteFollow(follow: FollowerModel): Promise<void> {

    const sql = `DELETE FROM followers WHERE userId = ? AND vacationId =?`;

    const result: OkPacket = await dal.execute(sql, [follow.userId, follow.vacationId]);

    if(result.affectedRows === 0) throw new IdNotFoundError(follow.vacationId);

};


//update vacation
async function updateVacation(vacation: VacationModel): Promise<VacationModel> {

    const error = vacation.validate();
    if(error) throw new ValidationError(error);

    if(vacation.image){
        await safeDelete("./src/1-assets/images/" + vacation.imageName);
        const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."));
        vacation.imageName = uuid() + extension;
        await vacation.image.mv("./src/1-assets/images/" + vacation.imageName);
        delete vacation.image;
    };
    
    const sql = `UPDATE vacations SET  
                    destination = ?,
                    description = ?,
                    imageName = ?,
                    arrivalDate = ?,
                    departureDate = ?,
                    price = ?
                    WHERE vacations.vacationId = ?`;

    const result: OkPacket = await dal.execute(sql, [vacation.destination, vacation.description, vacation.imageName,
                                                      vacation.arrivalDate, vacation.departureDate, vacation.price, vacation.vacationId]);

    if(result.affectedRows === 0) throw new IdNotFoundError(vacation.vacationId);
    return vacation;
};

//add vacation
async function addVacation(vacation: VacationModel): Promise<VacationModel> {

    const error = vacation.validate();
    if(error) throw new ValidationError(error);
 
    if(vacation?.image){
        const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."));
        vacation.imageName = uuid() + extension;
        await vacation.image.mv(`${config.imagesFolder}/${vacation.imageName}`);
        delete vacation.image;
    };

    const sql = `INSERT INTO vacations VALUES (DEFAULT, ?, ?, ?, ?, ?, ? )`;

    const result: OkPacket = await dal.execute(sql, [vacation.destination, vacation.description, vacation.imageName,
                                                        vacation.arrivalDate, vacation.departureDate, vacation.price]);

    vacation.vacationId = result.insertId;
    vacation.followersCount = 0;
    vacation.isFollowed = false;
    
    return vacation;
};

//delete vacation
async function deleteVacation(vacationId: number): Promise<void> {
 
    const sqlSelectImage = `SELECT imageName FROM vacations WHERE vacations.vacationId = ?`;
    const vacations = await dal.execute(sqlSelectImage, [vacationId]);
    const vacation = vacations[0];
    if(!vacations) throw new IdNotFoundError(vacationId);
    await safeDelete(`${config.imagesFolder}/${vacation.imageName}`);
    
    const sql = `DELETE FROM vacations WHERE vacations.vacationId = ? `;

    const result: OkPacket = await dal.execute(sql, [vacationId]);

    if(result.affectedRows === 0) throw new IdNotFoundError(vacationId);

};


export default {

    getAllVacations,
    getOneVacation,
    addFollow,
    deleteFollow,
    updateVacation,
    addVacation, 
    deleteVacation
};


