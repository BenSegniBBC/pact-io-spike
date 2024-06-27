import axios, { AxiosResponse } from "axios";
import { config } from "./config/config";

export class HttpService {
    public static get(address: string): Promise<AxiosResponse> {
        const endpoint = axios.get(`${config.url}:${config.port}/${address}`);
        return endpoint;
    }

    public static isError(error: unknown):boolean {
        return axios.isAxiosError(error)
    }
}