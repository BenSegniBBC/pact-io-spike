import React, { useEffect, useState } from "react";
import { Team } from './interface/team';
import { HttpService } from "../../http/Http.Service";
import './Teams.css'
import { TeamMessageEnum } from "./enum/team.message.enum";

const TeamsComponent: React.FC = () => {
    const address = TeamMessageEnum.address;

    const [isLoading, setIsLoading] = useState(false);

    const [teamLoaded, setTeamLoaded] = useState(false);
    const [teamData, setTeam] = useState<Team | null>(null);

    const [teamsData, setTeams] = useState<Team[] | null>(null);

    const [error, setError] = useState('');

    const getTeams = async () => {
        setIsLoading(true);

        try {
            const teamsResponse = (await HttpService.get(address));
            setTeams(teamsResponse.data);
        } catch (error: any) {
            if (HttpService.isError(error)) {
                setError(error.message);
            } else {
                setError(TeamMessageEnum.errorMessage)
            }
        } finally {
            setIsLoading(false);
        }
    };

    const getTeam = async (id: number) => {
        setTeamLoaded(false);

        try {
            const teamResponse = (await HttpService.getById(address, id));
            setTeam(teamResponse.data);
        } catch (error: any) {
            if (HttpService.isError(error)) {
                setError(error.message);
            } else {
                setError(TeamMessageEnum.errorMessage)
            }
        } finally {
            setTeamLoaded(true);
        }
    }

    const loadingTeams = TeamMessageEnum.teamsLoading;
    const noTeamsSelected = TeamMessageEnum.noTeamsSelected;
    const noTeamsData = TeamMessageEnum.noTeamsData;


    useEffect(() => {
        getTeams();
    }, []);

    if (isLoading) {
        return <p>{loadingTeams}</p>
    }

    if (error) {
        return <p>Error: {error}</p>
    }

    if (teamsData) {
        return (
            <>
                <div className="teams-wrapper">
                    <h1>Teams:</h1>
                    <ul>
                        {teamsData.map((team) => (
                            <li key={team.id}>
                                {team.id} - {team.name} <button onClick={() => getTeam(team.id)}>Get Team</button>
                            </li>
                        ))}
                    </ul>

                    <h2>Selected Team</h2>

                    {teamLoaded ?
                        <div className="selection-made">
                            <strong>{teamData?.id}</strong> - {teamData?.name}
                        </div> : <span className="no-selection">{noTeamsSelected}</span>
                    }
                </div>
            </>
        )
    } else {
        return <p>{noTeamsData}</p>
    }
}

export default TeamsComponent;