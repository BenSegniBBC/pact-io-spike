import { render, screen } from "@testing-library/react";
import TeamsListComponent from "./Teams.List";
import { teamsMock } from "../mocks/teams.mock";

let renderComponent = render(<TeamsListComponent teamsData={teamsMock} />);

describe('TeamsListComponent', () => {
    beforeEach(() => {
        renderComponent;
    });

    it('should display teams', () => {
        const chelsea = screen.getByText(/Chelsea/);
        const liverpool = screen.getByText(/Liverpool/);
        const arsenal = screen.getByText(/Arsenal/);

        expect(chelsea).toBeInTheDocument();
        expect(liverpool).toBeInTheDocument();
        expect(arsenal).toBeInTheDocument();
    });
});