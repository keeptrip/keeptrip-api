import Hapi from "@hapi/hapi"

export const rootRoute: Hapi.ServerRoute = {
    method: "get",
    path: "/",
    handler: function (req, h) {
        return {
            message: "OK"
        }
    }
}