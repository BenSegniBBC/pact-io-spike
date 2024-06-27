import { render, screen } from "@testing-library/react";
import TeamComponent from "./Team";

test('renders teams componeent', () => {
    render(<TeamComponent teamData={null} teamLoaded={true} />);
    const team = screen.getByText(/No Team Selected/);
    expect(team).toBeInTheDocument();
});