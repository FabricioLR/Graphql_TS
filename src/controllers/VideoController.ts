import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"
import { UserRepository } from "../repositories/UserRepository"
import { VideoRepository } from "../repositories/VIdeoRepository"


class VideoController{
    async AddVideo(req: Request, res: Response){
        const { nome, url } = req.body
        const owner = req.UserId
        const like = 0
        const deslike = 0
        const visualizacoes = 0

        if (!nome || !url){
            return res.status(400).send({ error: "incorect credentials" })
        }

        const videorepository = getCustomRepository(VideoRepository)

        const video = videorepository.create({ nome, url, owner, visualizacoes, like, deslike })

        if (!video){
            return res.status(400).send({ error: "add video failed, try again" })
        }

        await videorepository.save(video)

        return res.send({ success: true, video: video })
    }
    async GetVideos(req: Request, res: Response){
        const videorepository = getCustomRepository(VideoRepository)

        const videos = await videorepository.find()

        if (!videos){
            return res.status(400).send({ error: "get videos failed, try again" })
        }

        return res.send({ success: true, videos: videos })
    }
    async GetExpecifyVideo(req: Request, res: Response){
        const { id } = req.body

        if (!id){
            return res.status(400).send({ error: "incorect credential" })
        }

        const videorepository = getCustomRepository(VideoRepository)
        const userrepository = getCustomRepository(UserRepository)

        const video = await videorepository.findOne({ id })

        if (!video){
            return res.status(400).send({ error: "video not found" })
        }

        const user = await userrepository.findOne({ where: { id: video.owner }, select: ["nome"]})

        return res.send({ success: true, video: video, owner_name: user })
    }
}

export { VideoController }