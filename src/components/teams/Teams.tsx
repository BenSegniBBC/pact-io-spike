import React, { useEffect, useState } from "react";
import { Team } from '../interface/team';
import HttpService from "../../http/Http.Service";
import './Teams.css'
import { TeamMessageEnum } from "./enum/team.message.enum";
import TeamsListComponent from "../teams-list/Teams.List";

const TeamsComponent: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [teamsData, setTeams] = useState<Team[] | null>(null);

    const [error, setError] = useState('');

    const httpService = new HttpService();

    const getTeams = async () => {
        setIsLoading(true);
        try {
            const teamsResponse = (await httpService.get(httpService.teamsAddress));
            setTeams(teamsResponse.data);
        } catch (error: any) {
            if (httpService.isError(error)) {
                setError(error.message);
            } else {
                setError(TeamMessageEnum.errorMessage)
            }
        } finally {
            setIsLoading(false);
        }
    };

    const loadingTeams = TeamMessageEnum.teamsLoading;
    const noTeamsData = TeamMessageEnum.noTeamsData;

    useEffect(() => {
        getTeams();
    }, []);

    return (
        <main>
            {isLoading ? <p className="block loading-graphic">{loadingTeams}</p> :
                error ? <p className="block error-message">Error: {error}</p> :
                    teamsData ?
                        <>
                            <div className="teams-wrapper">
                                <TeamsListComponent teamsData={teamsData} />
                            </div>
                        </> :
                        <p className="block no-data">{noTeamsData}</p>
            }
        </main>
    )
}

export default TeamsComponent;