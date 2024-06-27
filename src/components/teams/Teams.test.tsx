import { render, screen } from "@testing-library/react";
import TeamsComponent from "./Teams";

test('renders teams componeent', () => {
  render(<TeamsComponent />);
  const loading = screen.getByText(/Loading Teams.../i);
  expect(loading).toBeInTheDocument();
});