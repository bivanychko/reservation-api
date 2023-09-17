import { ClassConstructor, plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";
import { config as envConfig } from "dotenv";
import { expand } from "dotenv-expand";

let config: Record<string, string | undefined> | null = null;

export function getEnv(reload = false): Record<string, string | undefined> {
  if (config && !reload) {
    return config;
  }

  const loadedEnv = envConfig({ path: ".env" });

  expand(loadedEnv);

  config = process.env;
  return config;
}

export function validateConfig<T>(config: Record<string, unknown>, envDto: ClassConstructor<T>): T {
  const validatedConfig = plainToInstance(envDto, config, {
    exposeDefaultValues: true,
  });

  const errors = validateSync(validatedConfig as Object, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    const errMessages: string[] = [];

    errors.forEach(e => {
      const errConstraints = e.constraints as { [type: string]: string };

      for (const [, errMessage] of Object.entries(errConstraints)) {
        errMessages.push(errMessage);
      }
    });

    throw new Error(`Config initialization error: \n${errMessages.join(",\n")}`);
  }

  return validatedConfig;
}
