import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
//import jwt from 'jsonwebtoken';
import 'login.css'

export const signupController= async (req: Request , res: Response)=>
    {
        try {
            const CREATION_TIME=new Date (Date.now())
            const { USERNAME, EMAIL, PASSWORD_HASH,creation_date } = req.body;

            // Check if user with the same email already exists
           
        }
        catch{}
    }