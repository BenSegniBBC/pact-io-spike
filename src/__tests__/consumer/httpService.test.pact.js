import { teamsMock } from '../../components/mocks/teams.mock';
import reactProvider from '../../../pact/setup';
import HttpService from '../../http/Http.Service';
import { like, somethingLike } from '@pact-foundation/pact/src/dsl/matchers';


describe('The ReactFC API', () => {
    describe('gets all the teams', () => {
        test('returns all teams', async () => {
            await reactProvider.addInteraction({
                states: [{ description: 'All Teams Exist' }],
                uponReceiving: 'get all teams',
                withRequest: {
                    method: "GET",
                    path: '/teams'
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: like(teamsMock)
                }
            });

            await reactProvider.executeTest(async (mockserver) => {
                const api = new HttpService(mockserver.url);
                const response = await api.get(api.teamsAddress);
                expect(response.data).toStrictEqual(teamsMock);
            });
        });

        test('id 3 exists', async () => {
            await reactProvider.addInteraction({
                states: [{ description: 'Team with Id 3 exists' }],
                uponReceiving: 'Get Team with Id 3',
                withRequest: {
                    method: 'GET',
                    path: '/teams/3'
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: like(
                        teamsMock[2]
                    )
                }
            });

            await reactProvider.executeTest(async (mockserver) => {
                const api = new HttpService(mockserver.url);
                const response = await api.getById(api.teamsAddress, '3');
                expect(response.data).toStrictEqual(teamsMock[2]);
            });
        });

        test('no team exists with that Id', async () => {
            await reactProvider.addInteraction({
                states: [{ description: 'Team with Id 5 does not exist' }],
                uponReceiving: 'Get Request for Team with Id 5',
                withRequest: {
                    method: 'GET',
                    path: '/teams/5'
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: []
                }
            });

            await reactProvider.executeTest(async (mockserver) => {
                const api = new HttpService(mockserver.url);
                const response = await api.getById(api.teamsAddress, '5');
                await expect(response.data).toStrictEqual([]);
            });
        });
    });
})
