import "reflect-metadata"
import "./database"
import express from "express"
import cors from "cors"
import { router } from "./routes"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(router)

app.listen(3000, () => {
    console.log("server rodando na porta: " + 3000)
})
