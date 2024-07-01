import reactProvider from "./setup";

beforeAll(async () => {
    reactProvider.setup();
});

// afterAll((done) => {
afterAll(async () => {
    global.provider.finalize().then(() => done());
    // global.provider.finalize().then(() => done());
});