import axios, { AxiosResponse } from "axios";

export class HttpService {
    public static get(address: string): Promise<AxiosResponse> {
        const endpoint = axios.get(`http://localhost:8000/${address}`);
        return endpoint;
    }

    public static isError(error: unknown):boolean {
        return axios.isAxiosError(error)
    }
}