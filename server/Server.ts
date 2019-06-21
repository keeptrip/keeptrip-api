import Hapi from "@hapi/hapi"

export default class Server {

    host: string
    port: number
    routes: Hapi.ServerRoute[] = []

    hapi: Hapi.Server

    constructor(host: string, port: number) {
        this.host = host
        this.port = port

        this.hapi = new Hapi.Server({
            port,
            host,
        })
    }

    prepare(): void {
        this.hapi.initialize()
    }

    start(): void {
        this.hapi.start()
    }

    stop(): void {
        this.hapi.stop()
    }
}