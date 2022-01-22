import { Arg, Mutation, Query, Resolver, Args } from "type-graphql";
import { getCustomRepository } from "typeorm";
import ModelVideo from "../models/video/ModelVideo";
import { VideoRepository } from "../repositories/VIdeoRepository";
import { Stream } from "stream"
import { GraphQLUpload } from "graphql-upload"
import { createWriteStream } from "fs"

type CreateVideoProps = {
    url: string
    nome: string
    owner: number
}

type UploadProps = {
    filename: string
    createReadStream: () => Stream
}

@Resolver(ModelVideo)
class VideoResolver {
   /* @Mutation(() => ModelVideo)
    async CreateVideo(@Args() { url, nome, owner }: CreateVideoProps){
        const videoRepository = getCustomRepository(VideoRepository)

        const video = videoRepository.create({
            nome, url, owner, visualizacoes: 0, like: 0, deslike: 0
        })

        if (!video){
            throw new Error("create video failed, try again")
        }

        return video 
    }*/
    @Mutation(() => String)
    async CreateVideo(@Arg("file", () => GraphQLUpload) { createReadStream, filename }: UploadProps){
        createReadStream()
            .pipe(createWriteStream(__dirname + "../images/" + filename))
            .on("finish", () => {return "sim"})
            .on("error", () => {return "nao"})
    }

    @Mutation(() => ModelVideo)
    async GetVideo(@Arg("id") id: number){
        const videoRepository = getCustomRepository(VideoRepository)

        const video = await videoRepository.findOne({
            where: {
                id: id
            }
        })

        if (!video){
            throw new Error("video not found")
        }

        return video
    }

    @Query(() => [ModelVideo])
    async GetVideos(){
        const videoRepository = getCustomRepository(VideoRepository)

        const videos = await videoRepository.find()

        return videos
    }
}

export default VideoResolver