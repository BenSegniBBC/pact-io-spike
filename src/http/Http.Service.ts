import axios, { AxiosResponse } from "axios";
import { config } from "./config/config";
import { TeamMessageEnum } from "../components/teams/enum/team.message.enum";
import React from "react"; 

export default class HttpService extends React.Component {
    private static url = `${config.url}${config.port}`;

    public static get(address: string): Promise<AxiosResponse> {
        return axios.get(`${HttpService.url}/${address}`);
    }

    public static getById(address: string, id: number): Promise<AxiosResponse> {
        return axios.get(`${HttpService.url}/${address}/${id}`);
    }

    public static isError(error: unknown): boolean {
        return axios.isAxiosError(error)
    }

    public static address = TeamMessageEnum.address;
}