import Server from "./Server"
import routes from "./routes"

const server = new Server("localhost", 3000)

server.routes = routes
server.prepare()
server.start()