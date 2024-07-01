export interface Team {
    id: string;
    name: 'Liverpool' | 'Chelsea' | 'Arsenal'
}

export interface TeamsData {
    teamsData: Team[];
}

export interface TeamData {
    teamData: Team | null;
    teamLoaded: boolean;
}