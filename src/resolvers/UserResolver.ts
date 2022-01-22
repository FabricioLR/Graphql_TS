import { Query, Resolver, Mutation, Arg, Ctx, Authorized } from "type-graphql";
import { ApolloError } from "apollo-server"
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";

import ModelUserResponse from "../models/user/ModelUserResponse";
import ModelUser from "../models/user/ModelUser";

import { HashVerify } from "../services/security/HashVerify";
import { GenerateToken } from "../services/security/GenerateToken";

type ContextProps = {
    token: string
    id: string
}

@Resolver(ModelUser)
class UserResolver {
    @Mutation(() => ModelUserResponse)
    async Register(@Arg("email") email: string, @Arg("email") name: string, @Arg("email") password: string){
        const userRepository = getCustomRepository(UserRepository)

        const UserAlreadyExists = await userRepository.findOne({
            where: {
                email
            }
        })

        if (UserAlreadyExists){
            throw new Error("user already exists")
        }

        const user = userRepository.create({
            email, nome: name, senha: password
        })

        if (!user){
            throw new Error("register failed, try again")
        }

        await userRepository.save(user)

        const token = GenerateToken(String(user.id))

        return { user, token }
    }

    @Mutation(() => ModelUserResponse)
    async Authenticate(@Arg("email") email: string, @Arg("password") password: string){
        const userRepository = getCustomRepository(UserRepository)

        const user = await userRepository.findOne({
            where: {
                email
            }
        })

        if (!user){
            throw new ApolloError("user not found", "400")
        }

        const verify = await HashVerify({ password, passwordUser: user.senha })

        if (!verify){
            throw new ApolloError("email or password invalid")
        }

        const token = GenerateToken(String(user.id))
        
        return { user, token }
    }
    
   // @Authorized()
    @Query(() => ModelUser)
    async Profile(@Ctx() ctx: ContextProps){
        const userRepository = getCustomRepository(UserRepository)

        const user = await userRepository.findOne({
            where: {
                id: 1
            }
        })

        if (!user){
            throw new ApolloError("user not found")
        }

        return user
    }
}

export default UserResolver