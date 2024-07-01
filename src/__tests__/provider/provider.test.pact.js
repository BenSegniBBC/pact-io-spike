const { Verifier } = require('@pact-foundation/pact');
const path = require('path');

describe('Pact Verification', () => {
    it('should validate the expectations of the HttpService', () => {
        const opts = {
            loglevel: 'warn',
            providerBaseUrl: 'http://127.0.0.1:8000',
            provider: 'ReactFC_API',
            providerVersion: '1.0.0',
            pactUrls: [
                path.resolve(__dirname, '../../../pacts/ReactFC_UI-ReactFC_API.json')
            ],
        };

        return new Verifier(opts).verifyProvider().then(response => {
            console.log(response)
        });
    })
})