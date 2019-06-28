import Hapi from '@hapi/hapi'

export const route: Hapi.ServerRoute = {
    method: 'post',
    path: '/trips',
    handler(req, h): object {
        return {
            message: 'OK',
        }
    },
}
