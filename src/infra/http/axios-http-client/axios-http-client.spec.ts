import { HttpPostParams } from "@/data/protocols/http"
import { AxiosHttpClient } from "./axios-http-client"
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const makedAxiosResult = {
    data: 'eu-sou-natan',
    status: 23

}
mockedAxios.post.mockResolvedValue(makedAxiosResult)
const makeSut = (): AxiosHttpClient => {
    return new AxiosHttpClient
}

const mockPostRequest = (): HttpPostParams<any> => ({
    url: 'https',
    body: {}
})
describe('AxiosHttpClient', () => {

    test('Should call axios with correct Url and verb', async () => {
        const request = mockPostRequest() as any
        const sut = makeSut()
        await sut.post(request)
        expect(mockedAxios.post).toHaveBeenNthCalledWith(request.url, request.body)

    }),
        test('Should return the correct statusCode and body', async () => {
            const sut = makeSut()
            const HttpResponse = await sut.post(mockPostRequest())
            expect(HttpResponse).toEqual({
                statusCode: makedAxiosResult.status,
                body: makedAxiosResult.data
            })

        })


}) 