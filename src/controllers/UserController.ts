import { compare, hash } from "bcryptjs"
import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"
import { UserRepository } from "../repositories/UserRepository"
import { sign } from "jsonwebtoken"
import { SECRET } from "../config/AuthToken"

function GenerateToken(id: number){
    const token = sign({ id: id}, SECRET, {
        expiresIn: 86400,
    })
    return token
}

class UserController{
    async RegisterUser(req: Request, res: Response){
        const { nome, email, senha_ } = req.body

        if (!nome || !email || !senha_){
            return res.status(400).send({ error: "incorect credentials" })
        }

        const user = getCustomRepository(UserRepository)

        if (await user.findOne({ email })){
            return res.status(400).send({ error: "email already used" })
        }

        const senha = await hash(senha_, 10)

        const new_user = user.create({ nome, email, senha })

        if (!new_user){
            return res.status(400).send({ error: "register failed, try again" })
        }

        await user.save(new_user)

        new_user.senha = ""

        const token = GenerateToken(new_user.id)

        return res.status(200).send({ success: true, user: new_user, token: token })

    }
    async AuthenticateUser(req: Request, res: Response){
        const { email, senha_ } = req.body

        if (!email || !senha_){
            return res.status(400).send({ error: "incorect credentials" })
        }

        const userrepository = getCustomRepository(UserRepository)

        const user = await userrepository.findOne({ email })

        if (!user){
            return res.status(400).send({ error: "email not found" })
        }

        if(!await compare(senha_, user.senha)){
            return res.status(400).send({ error: "email or password incorects" })
        }

        user.senha = ""

        const token = GenerateToken(user.id)

        return res.status(200).send({ success: true, user: user, token: token})
    }
}

export { UserController }