import axios, { AxiosResponse } from 'axios'
import { getAuthHeaders } from './getAuthHeaders'

export async function apiPost<T, D>(
    url: string,
    data: D,
    accessToken?: string
): Promise<T> {
    const fullUrl = import.meta.env.VITE_API_URL + url
    return axios
        .post<T>(fullUrl, data, {
            headers: getAuthHeaders(accessToken),
        })
        .then((response: AxiosResponse<T>) => {
            return response.data
        })
        .catch((error) => {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.code || 'Internal error')
            } else {
                throw new Error('Internal error')
            }
        })
}
