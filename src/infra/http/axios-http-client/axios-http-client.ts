import { HttpPostParams, HttpResponse, httPostClient } from "@/data/protocols/http";
import axios from 'axios'
export class AxiosHttpClient  implements httPostClient<any,any>{
    async post(params: HttpPostParams<any>): Promise<HttpResponse<any>> {
        const httpResponse = await axios.post(params.url, params.body)
        return {
            statusCode:httpResponse.status,
            body:httpResponse.data

        }
    }
}