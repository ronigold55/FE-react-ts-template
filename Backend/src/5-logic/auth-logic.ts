import { OkPacket } from "mysql";
import auth from "../2-utils/auth";
import hash from "../2-utils/cyber";
import dal from "../2-utils/dal";
import { UnauthorizeError, ValidationError } from "../4-models/client-errors";
import CredentialsModel from "../4-models/credentials-model";
import UserModel from "../4-models/user-model";

async function register(user: UserModel): Promise<string> {
    
    const error = user.validate();
    if (error) throw new ValidationError(error);

    user.password = hash(user.password);

    const sql = `INSERT INTO users (userId, firstName, lastName, username, password, roleId) VALUES(
                    DEFAULT, ?, ?, ?, ?, ?)`;

    const result: OkPacket = await dal.execute(sql, [user.firstName, user.lastName, user.username, user.password, 2]);

    user.userId = result.insertId;

    delete user.password;

    const token = auth.generateNewToken(user);

    return token;
}

async function login(credentials: CredentialsModel): Promise<string> {
    
    const error = credentials.validate();
    if (error) throw new ValidationError(error);

    credentials.password = hash(credentials.password);

    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;

    const users = await dal.execute(sql, [credentials.username, credentials.password]);

    const user = users[0];

    if(!user) throw new UnauthorizeError("Incorrect username or password!")

    delete user.password;

    const token = auth.generateNewToken(user);

    return token;

};

async function usernameExists(username: string): Promise<boolean> {
    // getting amount of users with 'username' 
    const sql = `SELECT
                        COUNT(*) AS usersWithName
                        FROM users
                        WHERE username = ?`;
    const users = await dal.execute(sql, [username]);
    // if there are more than 0, the username exists.
    return users[0].usersWithName > 0;
}

export default {
    register,
    login,
    usernameExists
}