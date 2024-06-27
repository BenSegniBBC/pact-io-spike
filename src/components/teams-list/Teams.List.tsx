import React, { useState } from 'react';
import { Team } from '../interface/team';
import { HttpService } from '../../http/Http.Service';
import { TeamMessageEnum } from '../teams/enum/team.message.enum';
import TeamComponent from '../team/Team';

interface TeamsData {
    teamsData: Team[];
}

const TeamsListComponent: React.FC<TeamsData> = ({ teamsData }) => {
    const [teamLoaded, setTeamLoaded] = useState(false);
    const [teamData, setTeam] = useState<Team | null>(null);

    const [error, setError] = useState('');

    const getTeam = async (id: number) => {
        setTeamLoaded(false);

        try {
            const teamResponse = (await HttpService.getById(HttpService.address, id));
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