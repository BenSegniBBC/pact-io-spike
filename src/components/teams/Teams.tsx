import React, { useEffect, useState } from "react";
import { Team } from '../../interface/team';
import { HttpService } from "../../http/Http.Service";
import './Teams.css'

const TeamsComponent: React.FC = () => {
    const [teamsData, setData] = useState<Team[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const getData = async (address: string) => {
        setIsLoading(true);

        try {
            const response = (await HttpService.get(address));
            setData(response.data);
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

    useEffect(() => { getData('teams') }, []);

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
                                {team.id} - {team.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </>
        )
    } else {
        return <p>No Data</p>
    }
}

export default TeamsComponent;