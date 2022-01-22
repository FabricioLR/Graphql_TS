import { ObjectType, Field } from "type-graphql";

@ObjectType()
class ModelVideo {
    @Field()
    id: number

    @Field()
    nome: string

    @Field()
    url: string

    @Field()
    owner: number

    @Field()
    visualizacoes: number

    @Field()
    like: number

    @Field()
    deslike: number
}

export default ModelVideo