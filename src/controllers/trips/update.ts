import Hapi from '@hapi/hapi'

export const route: Hapi.ServerRoute = {
    method: 'patch',
    path: '/trips/{id}',
    handler(req, h): object {
        return {
            message: 'OK',
        }
    },
}
