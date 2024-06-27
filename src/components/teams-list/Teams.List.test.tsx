import { render, screen } from "@testing-library/react";
import TeamsListComponent from "./Teams.List";
import { teamsMock } from "../mocks/teams.mock";

test('renders teams componeent', () => {
    render(<TeamsListComponent teamsData={teamsMock} />);
    const teamName = screen.getByText(/Chelsea/);
    expect(teamName).toBeInTheDocument();
});