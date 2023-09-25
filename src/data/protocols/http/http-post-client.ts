export type HttpPostParams = {
    url:string
    body?:object
}

export interface httPostClient {
    post(params:HttpPostParams): Promise<void>
}
