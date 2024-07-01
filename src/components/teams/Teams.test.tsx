import axios from "axios";
import { teamsMock } from "../mocks/teams.mock";
import HttpService from "../../http/Http.Service";
import TeamsComponent from "./Teams";
import { act, render } from "@testing-library/react";
import setIsLoading from './Teams';
import getTeams from './Teams';
import setTeams from './Teams';

jest.mock('../../http/Http.Service');

describe('TeamsComponent', () => {
  test('it successfully returns a list of teams', async () => {
    const mockTeams = teamsMock;
    const mockError = new Error('Network Error');

    const httpService = new HttpService();

    (httpService.get as jest.Mock).mockResolvedValueOnce({ data: mockTeams });

    const { getByText, rerender } = render(<TeamsComponent />);

    expect(getByText(/Loading/i)).toBeInTheDocument();
    expect(getByText(/Error/i)).not.toBeInTheDocument();

    await act(async () => {
      await getTeams(true);
    });

    expect(getByText(/Loading/i)).not.toBeInTheDocument();
    expect(getByText(/Error/i)).not.toBeInTheDocument();
    expect(getByText(/Liverpool/i)).toBeInTheDocument();
  });
});
