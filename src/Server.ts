import Hapi from '@hapi/hapi'

export class Server {
    private host: string

    private port: number

    public set routes(value: Hapi.ServerRoute[]) {
        value.forEach((route): void => {
            this.hapi.route(route)
        })
    }

    public hapi: Hapi.Server

    public constructor(host: string, port: number) {
        this.host = host
        this.port = port

        this.hapi = new Hapi.Server({
            port,
            host,
        })
    }

    public async prepare(): Promise<void> {
        await this.hapi.initialize()
    }

    public async start(): Promise<void> {
        await this.hapi.start()

        console.log(`Server started at: ${this.hapi.info.uri}`)
    }

    public stop(): void {
        this.hapi.stop()
    }
}
