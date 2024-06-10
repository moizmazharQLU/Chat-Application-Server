
import cors from 'cors';
import  { Request, Response } from 'express';
import express  from 'express';
import fs from 'fs';
// import pool from './ConnectDb.ts'

const app = express();


app.use(cors());

import { Pool } from 'pg';

const port = 3000;



const pool = new Pool({
  connectionString: 'postgresql://Chat-Application_owner:hn07jZaKWLcs@ep-rapid-meadow-a5ycxn6b-pooler.us-east-2.aws.neon.tech/Chat-Application?sslmode=require',
  ssl: {
    rejectUnauthorized: false
  }
});


 
app.get('/Users', async (req: Request, res: Response) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM USERS');
    client.release();
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: Error });
  }
});

pool.connect().then(() => {
    console.log("DB Connected")
    app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})
}).catch(console.error);


// Read and execute the SQL file to set up the database tables
const sql = fs.readFileSync('../src/db/schema.sql', 'utf8');
pool.query(sql, (err, result) => {
    if (err) {
        console.error('Error executing SQL:', err);
    } else {
        console.log('Tables created successfully.');
    }
});