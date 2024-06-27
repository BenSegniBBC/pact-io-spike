import { render, screen } from "@testing-library/react";
import TeamsListComponent from "./Teams.List";

test('renders teams componeent', () => {
    render(<TeamsListComponent teamsData={[]} />);
    const noDataMessage = screen.getByText(/No Team Selected/);
    expect(noDataMessage).toBeInTheDocument();
});