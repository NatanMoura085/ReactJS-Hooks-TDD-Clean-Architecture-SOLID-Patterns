import { HttpPostParams, httPostClient,HttpResponse, HttpStatusCode  } from "@/data/protocols/http"


export class HttpPostClientSpy<T, R> implements httPostClient<T,R> {
    url?: string
    body?:T
    response: HttpResponse<R> = {
        statusCode:HttpStatusCode.ok
    }
    async post(params: HttpPostParams<T>): Promise<HttpResponse<R>> {
        this.url = params.url
        this.body = params.body
        return Promise.resolve(this.response)
    }
}