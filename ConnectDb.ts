import { Pool } from 'pg';


const uri = 'postgresql://Chat-Application_owner:hn07jZaKWLcs@ep-rapid-meadow-a5ycxn6b-pooler.us-east-2.aws.neon.tech/Chat-Application?sslmode=require';
const { hostname, username, password, port, pathname } = new URL(uri);
const pool = new Pool({
    database:pathname.substring(1),
    user:username,
    password,
    host:hostname,
    port:parseInt(port),
    ssl: {
        rejectUnauthorized: false,
    },
});
export default pool