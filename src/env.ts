type AvailableEnvs = "SECRET_KEY" | "MONGO_URI"

export function getEnv(key: AvailableEnvs): string{
    if(!process.env[key]){
        throw new Error(`You must to include a ${key} in your environment variables.`)
    }

    const envParamns = {
        SECRET_KEY: process.env.SECRET_KEY,
        MONGO_URI: process.env.MONGO_URI,
    }

    return envParamns[key]?.toString() || ""
}