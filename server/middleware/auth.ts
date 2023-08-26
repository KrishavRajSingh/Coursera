import { Errback, NextFunction, Request, Response } from "express";
import {secretKey} from "../secret";
import jwt from "jsonwebtoken";

export const authenticateJWT = (req: Request,res: Response,next: NextFunction)=>{
    const authHeader = req.headers.authorization;
    if(authHeader){
      const token = authHeader.split(' ')[1];
      jwt.verify(token, secretKey, (err,user)=>{
        if(err)
        throw err;
        if(!user || typeof user === "string")
        return res.sendStatus(403);
        req.headers = user;
        next();
      })
    }else{
      return res.status(401).json({msg: "unauthorized"});
    }
}
