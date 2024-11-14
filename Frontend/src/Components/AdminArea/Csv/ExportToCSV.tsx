import * as mysqlLib from 'mysql2/promise';
import { createObjectCsvWriter } from 'csv-writer';

async function ExportToCSV(): Promise<void> {
    // Set up the MySQL connection
    const connection = await mysqlLib.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'vacation'
    });

    try {
        // Define your query
        const query = 'SELECT * FROM users JOIN vacations ON users.id = vacations.user_id JOIN followers ON users.id = followers.user_id';
        const [rows] = await connection.execute(query) as any[]; // Specify rows as an array

        // Check if rows are returned
        if (!rows || rows.length === 0) {
            console.log('No data found');
            return;
        }

        // Set up CSV writer
        const csvWriter = createObjectCsvWriter({
            path: 'FE/Frontend/src/Components/AdminArea/CSV/vacation.csv', // Corrected file path
            header: Object.keys(rows[0]).map((key) => ({ id: key, title: key })), // Correct header mapping
        });

        // Write rows to CSV
        await csvWriter.writeRecords(rows);
        console.log('CSV file created successfully!');
    } catch (error) {
        console.error('Error exporting data:', error);
    } finally {
        await connection.end();
    }
}

// // Export the function without calling it
export default ExportToCSV;

// import { parse } from "csv-parse/sync";
// import { stringify } from "csv-stringify/sync";
// import VacationModel from "../../../Models/VacationModel";
// import * as fsp from "fs/promises";

// async function writeVacationsToCsv(vacations: VacationModel[]): Promise<void> {
//     const data = stringify(vacations, { header: true });
//     await fsp.writeFile("vacation.csv", data, "utf-8");
// }

// async function readVacationsFromCsv(): Promise<VacationModel[]> {
//     const data = await fsp.readFile("vacation.csv", "utf-8");
//     return parse(data, { columns: true, cast: true });
// }

// export default {
//     writeVacationsToCsv,
//     readVacationsFromCsv
// };
