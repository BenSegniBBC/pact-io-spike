import { render, screen } from "@testing-library/react";
import TeamsComponent from "./Teams";

test('renders teams componeent', () => {
  render(<TeamsComponent />);
  const team = screen.getByText(/Liverpool/);
  expect(team).toBeInTheDocument();
});