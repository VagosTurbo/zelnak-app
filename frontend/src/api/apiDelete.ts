import axios, { AxiosResponse } from 'axios';
import { getAuthHeaders } from './getAuthHeaders';

export async function apiPut<T, R>(url: string, data: T, accessToken: string): Promise<R> {
    const fullUrl = import.meta.env.VITE_API_URL + url;
    return axios
        .put<R>(fullUrl, data, {
            headers: getAuthHeaders(accessToken),
        })
        .then((response: AxiosResponse<R>) => {
            return response.data;
        })
        .catch((error) => {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.code || 'Internal error');
            } else {
                throw new Error('Internal error');
            }
        });
}
