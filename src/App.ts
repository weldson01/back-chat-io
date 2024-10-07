import http from "node:http"
import Express, { Application } from "express";
import { Server } from "socket.io";
import cors from "cors"
import routes from "./routes"

class App {
    public app: Application;
    private server: http.Server;
    private io: Server;
    constructor() {
        this.app = Express()
        this.server = http.createServer(this.app)
        this.io = new Server(this.server, { cors: { origin: "http://localhost:3000" } })
        this.middlewares()
        this.routes()
    }
    startServer() {
        this.server.listen(8000, () => console.log("Server is running"))
        this.startSocketIo()
    }
    startSocketIo() {
        this.io.on("connection", (socket) => {
            socket.on("message", (msg) => {
                console.log(`User ${socket.id} send the mensage: ${msg.text}`)
                this.io.sockets.emit("message", msg)
            })
        })
    }
    middlewares() {
        this.app.use(cors())
    }
    routes() {
        this.app.use(routes)
    }
}

export default App