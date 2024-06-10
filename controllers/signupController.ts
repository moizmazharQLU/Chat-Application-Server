import express from 'express';
import bcrypt from 'bcrypt';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgresql://Chat-Application_owner:hn07jZaKWLcs@ep-rapid-meadow-a5ycxn6b-pooler.us-east-2.aws.neon.tech/Chat-Application?sslmode=require',
});

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { emailOrPhone, displayName, username, password } = req.body;

  try {
    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert user into the database
    const result = await pool.query(
      'INSERT INTO USERS (USERNAME, EMAIL, PASSWORD_HASH, CREATION_TIME) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [username, emailOrPhone, passwordHash]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      // Handle unique constraint violation
      res.status(400).json({ error: 'Email or username already exists' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

export default router;

