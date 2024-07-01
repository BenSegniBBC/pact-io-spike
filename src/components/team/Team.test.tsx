import { render, screen } from "@testing-library/react";
import TeamComponent from "./Team";
import { teamsMock } from "../mocks/teams.mock";

test('renders teams componeent', () => {
    render(<TeamComponent teamData={teamsMock[0]} teamLoaded={true} />);
    const liverpool = screen.getByText(/Liverpool/);
    expect(liverpool).toBeInTheDocument();
});