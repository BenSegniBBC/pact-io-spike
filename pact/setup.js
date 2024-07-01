import path from 'path';
import { PactV3, SpecificationVersion, } from "@pact-foundation/pact";

const reactProvider = new PactV3({
    consumer: "ReactFC_UI",
    provider: "ReactFC_API",
    log: path.resolve(process.cwd(), "logs", "pact.log"),
    logLevel: "warn",
    dir: path.resolve(process.cwd(), "pacts"),
    spec: SpecificationVersion.SPECIFICATION_VERSION_V2,
    host: "127.0.0.1"
  });

  export default reactProvider;
