import { getEnv, validateConfig } from "./env.utils";
import { EnvVariables } from "./env.variables";

const config = validateConfig(getEnv(), EnvVariables);

export { config };
