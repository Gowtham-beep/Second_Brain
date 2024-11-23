declare namespace NodeJS {
    interface ProcessEnv {
        // Add the environment variable with its type
        mongodb_connection_URl: string; 
        JWT_SECRET:string;
    }
}
