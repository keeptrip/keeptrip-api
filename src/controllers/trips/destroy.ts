import Hapi from '@hapi/hapi'

export const route: Hapi.ServerRoute = {
    method: 'delete',
    path: '/trips/{id}',
    handler(req, h): object {
        return {
            message: 'OK',
        }
    },
}
