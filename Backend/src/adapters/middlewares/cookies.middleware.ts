require('dotenv').config()
import { Request, Response, NextFunction } from "express";
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET_KEY || '2549ccce75d879c239209090f7c4607d9afda790e21d7987a50bc4701ca8e6df';

export const cookieMiddleware = (req: Request, res: Response, next: NextFunction): any => {
    try {
        const token = req.cookies.jwt;
        const validPayload = jwt.verify(token, secret)
        console.log('MiddleCookie', validPayload);
        next();
    } catch (error) {
        res.status(401).json({
            ok: false,
            message: 'Unauthorized access to this site'
        })
    }
}