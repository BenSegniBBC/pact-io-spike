// import HttpService from "./src/http/Http.Service";
import { PactV3, MatchersV3, SpecificationVersion } from '@pact-foundation/pact';
const { eachLike, like } = MatchersV3;
import Team from "../components/interface/team";
import HttpService from "../http/Http.Service";
import { teamsMock } from '../components/mocks/teams.mock';
import reactProvider from '../../pact/setup';


describe('The ReactFC API', () => {
    describe('gets all the teams', () => {
        test('successfully', async () => {
            await reactProvider.addInteraction({
                states: [{ description: 'teams exist' }],
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
                    body: eachLike({
                        id: 1,
                        name: "Gelsenkirchen"
                    }),
                }

            })
            await reactProvider.executeTest(async () => {
                const api = HttpService
                console.log(HttpService)
                const teams = await HttpService.get('/teams') 
                expect(teams).toStrictEqual(teamsMock)
            })
        })
    })
})
      