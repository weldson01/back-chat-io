import { Router } from "express";

const routes = Router()

routes.get("/", (req, res) => {
    res.send("Server is on")
})

export default routes