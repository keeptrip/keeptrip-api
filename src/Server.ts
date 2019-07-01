import { Server } from 'http';
import express from 'express'
import { ApolloServer } from 'apollo-server-express'

import { TripResolver } from '@src/controllers/trip/TripResolver';
import { buildSchema } from 'type-graphql';

export const startServer = async (port: number): Promise<Server> => {
    const schema = await buildSchema({
        resolvers: [TripResolver]
    })
    const server = new ApolloServer({
        schema,
        playground: true,
    })

    const app = express()
    server.applyMiddleware({
        app,
        path: '/',
    })

    return app.listen({ port }, () => {
        console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
    })
}

export const stopServer = async (server: Server): Promise<void> => {
    await server.close()
}
