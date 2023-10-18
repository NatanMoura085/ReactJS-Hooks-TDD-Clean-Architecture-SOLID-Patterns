import { httPostClient, HttpStatusCode } from "@/data/protocols/http";
import { Authentication, AuthenticationParams } from "@/domain/usecases";
import { UnexpecError, InvalidCredentialsError } from "@/domain/errors";
import { AccountModel } from "@/domain/models";

export class RemoteAuthentication implements Authentication {
    private ano:string
    constructor(private readonly url: string,
        private readonly httPostClient: httPostClient<AuthenticationParams, AccountModel>
    ) { }

    async auth(params: AuthenticationParams): Promise<AccountModel> {
        const httpResponse = await this.httPostClient.post({ url: this.url, body: params })

        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok: return httpResponse.body
            case HttpStatusCode.unathorized: throw new InvalidCredentialsError()
            default: throw new UnexpecError()

        }
    }

}