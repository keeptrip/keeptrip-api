import Server from "./Server"
import routes from "./routes"

(async function() {
    const server = new Server("localhost", 3000)

    server.routes = routes
    
    await server.prepare()
    await server.start()
})()