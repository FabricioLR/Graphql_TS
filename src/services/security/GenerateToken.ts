import { sign } from "jsonwebtoken";

export function GenerateToken(id: string){
    const token = sign({ id }, String(process.env.SECRET), {
        expiresIn: "1d"
    })

    return token
}