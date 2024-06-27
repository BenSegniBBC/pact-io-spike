import axios, { AxiosResponse } from "axios";
import { config } from "./config/config";

export class HttpService {
    private static url = `${config.url}${config.port}`;

    public static get(address: string): Promise<AxiosResponse> {
        return axios.get(`${HttpService.url}/${address}`);
    }

    public static getById(address: string, id: number): Promise<AxiosResponse> {
        return axios.get(`${HttpService.url}/${address}/${id}`);
    }

    public static isError(error: unknown):boolean {
        return axios.isAxiosError(error)
    }
}