import { teamsMock } from '../../components/mocks/teams.mock';
import reactProvider from '../../../pact/setup';
import HttpService from '../../http/Http.Service';
import { like } from '@pact-foundation/pact/src/dsl/matchers';


describe('The ReactFC API', () => {
    describe('gets all the teams', () => {        
        test('successfully', async () => {
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
    });

    describe('get team by id', () => {
        test('id 3 exists', async () => {
            await reactProvider.addInteraction({
                states: [{description: 'Team with Id 3 exists'}],
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
                    body: teamsMock[3]
                }
            })
        });
    });
})
