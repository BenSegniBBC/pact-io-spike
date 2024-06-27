import React, { useEffect, useState } from "react";
import { Team } from './interface/team';
import { HttpService } from "../../http/Http.Service";
import './Teams.css'

const TeamsComponent: React.FC = () => {
    const address = 'teams'
    const [isLoading, setIsLoading] = useState(false);

    const [teamLoaded, setTeamLoaded] = useState(false);
    const [teamData, setTeam] = useState<Team | null>(null);

    const [teamsData, setTeams] = useState<Team[] | null>(null);
    const [error, setError] = useState('');
    const getTeams = async () => {
        setIsLoading(true);

        try {
            const teamsResponse = (await HttpService.get(address));
            const teamResponse = (await HttpService.getById(address, 1));
            setTeams(teamsResponse.data);
            setTeam(teamResponse.data);
        } catch (error: any) {
            if (HttpService.isError(error)) {
                setError(error.message);
            } else {
                setError('Unexpected Error')
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
                setError('Unexpected Error')
            }
        } finally {
            setTeamLoaded(true);
        }
    }

    useEffect(() => {
        getTeams();
    }, []);

    if (isLoading) {
        return <p>Loading Teams...</p>
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

                    <h2>Selected Team:</h2>

                    {teamLoaded 
                        ?
                        <div className="selection-made">
                            <strong>{teamData?.id}</strong> - {teamData?.name}
                        </div> 
                        : 
                        <div className="no-selection">No Team Selected</div>
                    }
                </div>
            </>
        )
    } else {
        return <p>No Data</p>
    }
}

export default TeamsComponent;