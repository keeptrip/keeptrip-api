import Hapi from "@hapi/hapi"

export default class Server {

    host: string
    port: number

    set routes(value: Hapi.ServerRoute[]) {
        value.forEach((route) => {
            this.hapi.route(route)
        })
    }
    

    hapi: Hapi.Server

    constructor(host: string, port: number) {
        this.host = host
        this.port = port

        this.hapi = new Hapi.Server({
            port,
            host,
        })
    }

    async prepare(): Promise<void> {
        await this.hapi.initialize()
    }

    async start(): Promise<void> {
        await this.hapi.start()
    }

    stop(): void {
        this.hapi.stop()
    }
}