"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
// import pool from './ConnectDb.ts'
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const pg_1 = require("pg");
const port = 3000;
const pool = new pg_1.Pool({
    connectionString: 'postgresql://Chat-Application_owner:hn07jZaKWLcs@ep-rapid-meadow-a5ycxn6b-pooler.us-east-2.aws.neon.tech/Chat-Application?sslmode=require',
    ssl: {
        rejectUnauthorized: false
    }
});
app.get('/Users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield pool.connect();
        const result = yield client.query('SELECT * FROM USERS');
        client.release();
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ error: Error });
    }
}));
pool.connect().then(() => {
    console.log("DB Connected");
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}).catch(console.error);
// Read and execute the SQL file to set up the database tables
const sql = fs_1.default.readFileSync('../src/db/schema.sql', 'utf8');
pool.query(sql, (err, result) => {
    if (err) {
        console.error('Error executing SQL:', err);
    }
    else {
        console.log('Tables created successfully.');
    }
});
