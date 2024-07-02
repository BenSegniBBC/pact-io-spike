export interface Team {
    id: string;
    name: string,
    location: 'North' | 'South'
}

export interface TeamsData {
    teamsData: Team[];
}

export interface TeamData {
    teamData: Team | null;
    teamLoaded: boolean;
}