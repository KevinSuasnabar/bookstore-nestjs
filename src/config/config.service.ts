import * as fs from 'fs';
import { parse } from 'dotenv';

export class ConfigService {
    private readonly envConfig: { [key: string]: string }

    constructor() {
        const isDevelopmentEnviroment = process.env.NODE_ENV !== "production";
        if (isDevelopmentEnviroment) {//ambiente de desarrollo
            const envFilePath = __dirname + '/../../.env'
            const existsPath = fs.existsSync(envFilePath);
            if (!existsPath) {
                console.log(".env file does not exist")
                process.exit(0)
            }

            this.envConfig = parse(fs.readFileSync(envFilePath));
        } else {//ambiente de produccion
            this.envConfig = {
                PORT: process.env.PORT
            }

        }
    }


    get(key: string): string {
        return this.envConfig[key]
    }
}