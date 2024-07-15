import express, { Request, Response } from "express"

const app = express()

app.get("/", function (req:Request, res:Response) {
    res.send("Olá Mundo!")
})


app.listen(3333, function () {
    console.log("Servir rodando na porta 3333")
})