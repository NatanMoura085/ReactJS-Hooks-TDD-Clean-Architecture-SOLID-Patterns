export enum HttpStatusCode {
    ok = 200,
    noContent = 204,
    badRequest = 400,
    unathorized = 401,
    notFound = 400,
    serveError = 500
}

export type HttpResponse<T> = {
    statusCode: HttpStatusCode
    body?: T
}