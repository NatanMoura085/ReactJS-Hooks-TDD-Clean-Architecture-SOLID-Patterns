import { RemoteAuthentication } from "./remote-authentication";
import { HttpPostClientSpy } from "../../test/mock-http-client";
import { MockAuthentication } from "../../../domain/test/mock-authentication";
type SuTypes = {
    sut: RemoteAuthentication
    httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url: string = ''): SuTypes => {
    const httpPostClientSpy = new HttpPostClientSpy()
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

        })
});