import { verify } from "jsonwebtoken";

export function TokenVerify(token: string){
    const decoded = verify(token, String(process.env.SECRET))

    return (<any>decoded).id
}