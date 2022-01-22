require("dotenv").config({path: "./.env"})
import "reflect-metadata"
import "./database"

import { ApolloServer } from "apollo-server"
import { buildSchema } from "type-graphql"

import UserResolver from "./resolvers/UserResolver"
import { TokenVerify } from "./services/security/TokenVerify"
import VideoResolver from "./resolvers/VideoResolver"

BoosTrap()

async function BoosTrap(){
    const schema = await buildSchema({
        resolvers: [UserResolver, VideoResolver],
        authChecker: ({ context }) => {
            if (!TokenVerify(context.token)) return false

            const decoded = TokenVerify(context.token)

            context.id = decoded

            return true
        }
    })

    const server = new ApolloServer({
        schema,
        formatError: (error) => {
            return error
        },
        context: ({ req }) => {
            return { token: req.headers.token }
        }
    })

    server.listen({ port: 3300 }, console.log("rodando"))
}