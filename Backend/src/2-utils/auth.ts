import UserModel from "../4-models/user-model";
import jwt from "jsonwebtoken";
import RoleModel from "../4-models/role-model";

const secretKey = "myKittens"; 

function generateNewToken(user: UserModel): string {

    const container = { user };
    const token = jwt.sign(container, secretKey, {expiresIn: "2h"});
    return token;
}

function verifyToken(authHeader: string): Promise<Boolean> {

   return new Promise<boolean>((resolve, reject) => {

        try{
            if (!authHeader) {
                resolve(false);
                return;
            }

            const token = authHeader.substring(7);

            if(!token){
                resolve(false);
                return;
            }

            jwt.verify(token, secretKey, err => {

                if(err){
                    resolve(false)
                    return;
                }

                resolve(true);
                return;
            });

        }
        catch (err: any) {
            reject(err);
        }
   })
}

function getUserRoleFromToken(authHeader: string): RoleModel {

    const token = authHeader.substring(7);
    const container = jwt.decode(token) as { user: UserModel };
    const user = container.user;
    const role = user.roleId;

    return role;

}

function getUserIdFromToken(authHeader: string): number {

    const token = authHeader.substring(7);
    const container = jwt.decode(token) as { user: UserModel };
    const user = container.user;
    const userId = user.userId;

    return userId;

}

export default {
    generateNewToken,
    verifyToken,
    getUserRoleFromToken,
    getUserIdFromToken
}