import { ObjectType, Field } from "type-graphql"

@ObjectType()
class ModelUser {
    @Field()
    nome: string

    @Field()
    email: string

    @Field()
    senha: string
}

export default ModelUser