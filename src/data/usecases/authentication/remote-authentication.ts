import { httPostClient } from "../../protocols/http/http-post-client";
import { AuthenticationParams } from "../../../domain/usecases/authentication";

export class RemoteAuthentication {
    constructor(private readonly url: string,
        private readonly httPostClient: httPostClient
    ) { }

    async auth(params:AuthenticationParams): Promise<void> {
        await this.httPostClient.post({url:this.url,body:params})
    }

}