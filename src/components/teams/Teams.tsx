import React, { useEffect, useState } from "react";
import { Team } from '../interface/team';
import HttpService from "../../http/Http.Service";
import './Teams.css'
import { TeamMessageEnum } from "./enum/team.message.enum";
import TeamsListComponent from "../teams-list/Teams.List";
import { Observable, map, mergeMap, of, toArray } from 'rxjs';

const TeamsComponent: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [teamsData, setTeams] = useState<Team[]>([]);
    let teams$: Observable<Team[]>;
    const [error, setError] = useState('');
    const httpService = new HttpService();

    const southernTeams = ["Chelsea", 'Arsenal']

    const checkLocation = (name: string) => southernTeams.includes(name) ? 
    TeamMessageEnum.south : 
    TeamMessageEnum.north;

    const getTeams = async () => {
        setIsLoading(true);

        try {
            teams$ = of((await httpService.get(httpService.teamsAddress)).data).pipe(
                mergeMap(teams => teams),
                map(team =>
                    ({
                        ...team,
                        name: `${team.name} Football Club`,
                        location: checkLocation(team.name)
                    } as Team)),
                toArray()
            );

            teams$.subscribe({
                next: (res) => setTeams(res as Team[]),
                error: (error) => {
                    httpService.isError(error) ? 
                    setError(error.message) : 
                    setError(TeamMessageEnum.errorMessage)
                },
                complete: () => setIsLoading(false)
            });
        } catch (error: any) {
            httpService.isError(error) ? 
                    setError(error.message) : 
                    setError(TeamMessageEnum.errorMessage)
        } finally {
            setIsLoading(false)
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