import { ObjectType, Field,  } from "type-graphql"
import ModelUser from "./ModelUser"

@ObjectType()
class ModelUserResponse {
    @Field()
    user: ModelUser

    @Field()
    token: string
}

export default ModelUserResponse