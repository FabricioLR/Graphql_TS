import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"
import { SECRET } from "../config/AuthToken"

interface IToken{
    id: number;
}

class TokenMiddleware{
    async TokenVerify(req: Request, res: Response, next: NextFunction){
        const token = String(req.headers.token)

        if (token === null || token === undefined || token === "" || token === "null"){
            return res.status(400).send({ error: "token must be provided"})
        }

        try {
            const decoded = (verify(token, SECRET) as IToken).id

            req.UserId = decoded

            next()
        } catch (error) {
            return res.status(400).send({ error: "token invalid, try again"})  
        }
    }
}
export { TokenMiddleware }