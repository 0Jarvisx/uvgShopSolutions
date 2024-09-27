require('dotenv').config()
import { Request, Response, NextFunction } from "express";
const headerAuth = process.env.AUTHORIZATION || 'HoladesdeelBackend<3';
const glbDomain = process.env.DOMAIN || 'http://localhost/';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): any => {
    let headAuthB64 = req.headers.authorization || '';
    let headerReferer = req.headers.referer;

    if (headerReferer === undefined && headAuthB64 === undefined) {
        return res.status(401).json({
            ok: false,
            message: 'Unauthorized access to this site',
        });
    }

    if ((headerReferer != undefined && headerReferer.indexOf(glbDomain) > -1) || headAuthB64 != undefined) {

        if (typeof headAuthB64 == "string" && headAuthB64.length > 0) {

            let headAuth = Buffer.from(headAuthB64, 'base64').toString('utf-8');

            if (headAuth === headerAuth) {
                return next();
            } else {

                return res.status(401).json({
                    ok: false,
                    message: 'Unauthorized access to this site',
                });
            }
        }
        if (headAuthB64.length === 0) {
            return res.status(401).json({
                ok: false,
                message: 'Unauthorized access to this site',
            });
        }
    } else {
        headerReferer = (headerReferer) ? `when trying to request the resource( ${headerReferer} )` : `from user agent ( ${req.headers['user-agent']} )`;
        if (req.headers['sec-fetch-dest'] != 'document')

            return res.status(401).json({
                ok: false,
                message: 'Unauthorized access to this site',
            });
    }
}