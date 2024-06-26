import { render, screen } from "@testing-library/react";
import TeamsComponent from "./Teams";

test('renders learn react link', () => {
    render(<TeamsComponent />);
    const team = screen.getByText(/Liverpool/);
    expect(team).toBeInTheDocument();
  });