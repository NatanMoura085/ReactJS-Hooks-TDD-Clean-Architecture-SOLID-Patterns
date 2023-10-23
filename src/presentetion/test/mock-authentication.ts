import { Authentication, AuthenticationParams } from "@/domain/usecases";
import { AccountModel } from "@/domain/models";
import { MockAccountModel } from "@/domain/test";
export class AuthenticationSpy implements Authentication {
    account = MockAccountModel() 
    params: AuthenticationParams
    async auth(params: AuthenticationParams): Promise<AccountModel> {
        this.params = params
        return Promise.resolve(this.account)

    }
}