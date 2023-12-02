import { DeepReadonly } from 'ts-essentials';
import config from '../../env.config.json';

type ConfigVars = DeepReadonly<typeof config>;
type Environment = keyof typeof config;

export class ConfigReader {
  private static readonly _envVars: ConfigVars = config;
  
  static getEnvVars(environment: Environment = process.env.ENV as Environment || 'local'): Readonly<ConfigVars[Environment]> {
    const env = this._envVars[environment];
    if (!env) {
      throw new Error(`Invalid environment: ${environment}`);
    }
    return Object.freeze(env);
  }
}
