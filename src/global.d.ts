
// Code source: https://dev.to/asjadanis/parsing-env-with-typescript-3jjm
// Extend the ProcessEnv interface with our custom env variables.

namespace NodeJS {
    interface ProcessEnv {
        PORT: string;
        CONNECTION_STRING: string;
    }
}