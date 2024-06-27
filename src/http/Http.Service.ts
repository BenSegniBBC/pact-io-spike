import axios, { AxiosResponse } from "axios";
import { config } from "./config/config";

export class HttpService {
    public static get(address: string): Promise<AxiosResponse> {
        const url = `${config.url}${config.port}/${address}`;
        const endpoint = axios.get(url);
        return endpoint;
    }

    public static getById(address: string, id: number): Promise<AxiosResponse> {
        const url = `${config.url}${config.port}/${address}/${id}`;
        const endpoint = axios.get(url);
        return endpoint;
    }

    public static isError(error: unknown):boolean {
        return axios.isAxiosError(error)
    }
}