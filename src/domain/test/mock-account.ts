import { AuthenticationParams } from "@/domain/usecases";
import { AccountModel } from "../models";

export const MockAuthentication = (): AuthenticationParams => ({
    email: '',
    password: ' '
})

export const MockAccountModel = (): AccountModel => ({
    acessToken: '1234'
})