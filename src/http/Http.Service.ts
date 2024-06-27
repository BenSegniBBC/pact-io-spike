import axios, { AxiosResponse } from "axios";
import { config } from "./config/config";
import { TeamMessageEnum } from "../components/teams/enum/team.message.enum";

export const HttpService = {
    url: `${config.url}${config.port}`,

    get(address: string): Promise<AxiosResponse> {
        return axios.get(`${HttpService.url}/${address}`);
    },

    getById(address: string, id: number): Promise<AxiosResponse> {
        return axios.get(`${HttpService.url}/${address}/${id}`);
    },

    isError(error: unknown): boolean {
        return axios.isAxiosError(error)
    },

    address: TeamMessageEnum.address
}

export default HttpService;