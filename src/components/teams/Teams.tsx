import React, { useEffect, useState } from "react";
import { Team } from '../interface/team';
import  HttpService from "../../http/Http.Service";
import './Teams.css'
import { TeamMessageEnum } from "./enum/team.message.enum";
import TeamsListComponent from "../teams-list/Teams.List";

const TeamsComponent: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [teamsData, setTeams] = useState<Team[] | null>(null);

    const [error, setError] = useState('');

    const getTeams = async () => {
        setIsLoading(true);

        try {
            const teamsResponse = (await HttpService.get(HttpService.address));
            setTeams(teamsResponse.data);
        } catch (error: any) {
            if (HttpService.isError(error)) {
                setError(error.message);
            } else {
                setError(TeamMessageEnum.errorMessage)
            }
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 1500)
        }
    };

    const loadingTeams = TeamMessageEnum.teamsLoading;
    const noTeamsData = TeamMessageEnum.noTeamsData;

    useEffect(() => {
        getTeams();
    }, []);

    if (isLoading) {
        return <p className="block loading-graphic">{loadingTeams}</p>
    }

    if (error) {
        return <p className="block error-message">Error: {error}</p>
    }

    if (teamsData) {
        return (
            <>
                <div className="teams-wrapper">
                    <TeamsListComponent teamsData={teamsData} />
                </div>
            </>
        )
    } else {
        return <p>{noTeamsData}</p>
    }
}

export default TeamsComponent;