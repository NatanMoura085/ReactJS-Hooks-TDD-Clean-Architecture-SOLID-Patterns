import { HttpStatusCode } from "@/data/protocols/http";
import { RemoteAuthentication } from "./remote-authentication";
import { HttpPostClientSpy } from "@/data/test";
import { InvalidCredentialsError,UnexpecError } from "@/domain/errors";
import { MockAccountModel, MockAuthentication } from "@/domain/test";
import { AuthenticationParams } from "@/domain/usecases";
import { AccountModel } from "@/domain/models";
type SuTypes = {
    sut: RemoteAuthentication
    httpPostClientSpy: HttpPostClientSpy<AuthenticationParams,AccountModel>
}

const makeSut = (url: string = ''): SuTypes => {
    const httpPostClientSpy = new HttpPostClientSpy<AuthenticationParams,AccountModel>()
    const sut = new RemoteAuthentication(url, httpPostClientSpy)
    return {
        httpPostClientSpy,
        sut
    }
}
describe('RemoteAuthentication ', () => {
    test('Should call httPostClient', async () => {
        const url = 'other_url'
        const { sut, httpPostClientSpy } = makeSut(url)

        await sut.auth(MockAuthentication())
        expect(httpPostClientSpy.url).toBe(url)

    }),
        test('Should call httPostClient with correct body', async () => {

            const { sut, httpPostClientSpy } = makeSut()
            const authenticationParams = MockAuthentication()
            await sut.auth(authenticationParams)
            expect(httpPostClientSpy.body).toEqual(authenticationParams)

        }),
        test('Should throw InvalidCredentialError if  httPostClient returns 401', async () => {
            const { sut, httpPostClientSpy } = makeSut()
            httpPostClientSpy.response = {
                statusCode: HttpStatusCode.unathorized
            }
            const promise = sut.auth(MockAuthentication())
            await expect(promise).rejects.toThrow(new InvalidCredentialsError())


        }),
        test('Should throw UnexpectedError if  httPostClient returns 400', async () => {
            const { sut, httpPostClientSpy } = makeSut()
            httpPostClientSpy.response = {
                statusCode: HttpStatusCode.badRequest
            }
            const promise = sut.auth(MockAuthentication())
            await expect(promise).rejects.toThrow(new UnexpecError())


        }),
        test('Should throw UnexpectedError if  httPostClient returns 500', async () => {
            const { sut, httpPostClientSpy } = makeSut()
            httpPostClientSpy.response = {
                statusCode: HttpStatusCode.serveError
            }
            const promise = sut.auth(MockAuthentication())
            await expect(promise).rejects.toThrow(new UnexpecError())


        }),
        test('Should throw UnexpectedError if  httPostClient returns 404', async () => {
            const { sut, httpPostClientSpy } = makeSut()
            httpPostClientSpy.response = {
                statusCode: HttpStatusCode.notFound
            }
            const promise = sut.auth(MockAuthentication())
            await expect(promise).rejects.toThrow(new UnexpecError())


        }),
        test('Should return an AccountModel if  httPostClient returns 404', async () => {
            const { sut, httpPostClientSpy } = makeSut()
            const httpResult = MockAccountModel()
            httpPostClientSpy.response = {
                statusCode: HttpStatusCode.ok,
                body: httpResult
            }
            const account = await sut.auth(MockAuthentication())
            await expect(account).toEqual(httpResult)


        })
});