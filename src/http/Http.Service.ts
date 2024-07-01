import axios, { AxiosResponse } from "axios";
import { config } from "./config/config";
import { TeamMessageEnum } from "../components/teams/enum/team.message.enum";
import React from "react"; 
import { Team } from "../components/interface/team";

export default class HttpService {
    static url = `${config.url}${config.port}`;

    constructor(url?: string) {
        if(url === undefined || url === '') {
            url = `${config.url}${config.port}`;
        } if(url.endsWith("/")) {
            url = url.substr(0, url.length - 1)
        }

        HttpService.url = url;
    }
    

    public get(address: string): Promise<AxiosResponse<Team[]>> {
        return axios.get(`${HttpService.url}/${address}`);
    }

    public getById(address: string, id: string): Promise<AxiosResponse<Team>> {
        return axios.get(`${HttpService.url}/${address}/${id}`);
    }

    public isError(error: unknown): boolean {
        return axios.isAxiosError(error)
    }

    public teamsAddress = TeamMessageEnum.teamsAddress;
}