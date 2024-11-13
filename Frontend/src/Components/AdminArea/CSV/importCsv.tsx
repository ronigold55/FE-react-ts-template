// import mysql from 'mysql2/promise';
// import { createObjectCsvWriter } from 'csv-writer';
// import fs from 'fs';

// async function exportToCSV() {
//     // Set up the MySQL connection
//     const connection = await mysql.createConnection({
//         host: 'localhost',      
//         user: 'root',   
//         password: '',
//         database: 'vacation'  
//     });

//     try {
//         // Define your query
//         const query = 'SELECT * FROM followers'; 
//         const [rows] = await connection.execute(query);

//         // Check if rows are returned
//         if (!rows || rows.length === 0) {
//             console.log('No data found');
//             return;
//         }

//         // Set up CSV writer
//         const csvWriter = createObjectCsvWriter({
//             path: 'FE\Frontend\src\Components\AdminArea\Charts\CSV\importCsv.tsx', // The output CSV file path
//             header: Object.keys(rows[0]).map((key) => ({ id: Ex, title: key })),
//         });

//         // Write rows to CSV
//         await csvWriter.writeRecords(rows as any);
//         console.log('CSV file created successfully!');
//     } catch (error) {
//         console.error('Error exporting data:', error);
//     } finally {
//         await connection.end();
//     }
// }

// // Run the function
// exportToCSV();
