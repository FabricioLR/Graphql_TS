import { EntityRepository, Repository} from "typeorm"
import { Video } from "../entities/Video"

@EntityRepository(Video)
class VideoRepository extends Repository<Video>{}

export { VideoRepository }