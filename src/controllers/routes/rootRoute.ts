import Hapi from '@hapi/hapi'

export const rootRoute: Hapi.ServerRoute = {
    method: 'get',
    path: '/',
    handler(req, h): object {
        return {
            message: 'OK',
        }
    },
}
