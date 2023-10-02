import { HttpPostParams } from "@/data/protocols/http"
import { AxiosHttpClient } from "./axios-http-client"
import axios from "axios"
import { mockAxios } from "@/infra/test"

jest.mock('axios')

type SutTypes = {
    sut: AxiosHttpClient,
    mockedAxios: jest.Mocked<typeof axios>
}
const makeSut = (): SutTypes => {
    const sut = new AxiosHttpClient()
    const mockedAxios = mockAxios()
    return {
        sut,
        mockedAxios
    }
}

const mockPostRequest = (): HttpPostParams<any> => ({
  url: 'https://example.com',
    body: 'someBody'
})
describe('AxiosHttpClient', () => {

    test('Should call axios with correct Url and verb', async () => {
        const request = mockPostRequest() as any
        const { sut, mockedAxios } = makeSut()
        await sut.post(request)
        expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)

    }),
        test('Should return the correct statusCode and body', () => {
            const { sut, mockedAxios } = makeSut()
            const promise = sut.post(mockPostRequest())
            expect(promise).toEqual(mockedAxios.post.mock.results[0].value)

        })


}) 