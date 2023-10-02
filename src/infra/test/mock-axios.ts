import axios from 'axios'
export const mockAxios = (): jest.Mocked<typeof axios> => {
    const mockedAxios = axios as jest.Mocked<typeof axios>
    mockedAxios.post.mockResolvedValue({
        data: 'eu-sou-natan',
        status: 23

    })
    return mockAxios as any
}