import React, { useState } from 'react';
import { Team, TeamsData } from '../interface/team';
import  HttpService from '../../http/Http.Service';
import { TeamMessageEnum } from '../teams/enum/team.message.enum';
import TeamComponent from '../team/Team';

const TeamsListComponent: React.FC<TeamsData> = ({ teamsData }) => {
    const [teamLoaded, setTeamLoaded] = useState(false);
    const [teamData, setTeam] = useState<Team | null>(null);

    const [error, setError] = useState('');

    const httpService = new HttpService();

    const getTeam = async (id: string) => {
        setTeamLoaded(false);

        try {
            const teamResponse = (await httpService.getById(httpService.teamsAddress, id));
            setTeam(teamResponse.data);
        } catch (error: any) {
            if (httpService.isError(error)) {
                setError(error.message);
            } else {
                setError(TeamMessageEnum.errorMessage)
            }
        } finally {
            setTeamLoaded(true);
        }
    }

    if (error) {
        return <p className="block error-message">Error: {error}</p>
    }

    return (
        <>
            <h1>Teams:</h1>

            <ul>
                {teamsData.map((team) => (
                    <li key={team.id}>
                        {team.id} - {team.name} <button onClick={() => getTeam(team.id)}>Get Team</button>
                    </li>
                ))}
            </ul>

            <TeamComponent teamData={teamData} teamLoaded={teamLoaded} />
        </>
    )
}
export default TeamsListComponent;