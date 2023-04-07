import * as dotenv from 'dotenv';
import * as Joi from "joi";
import { Injectable } from '@nestjs/common';
import {Stage} from "../enums/stage.enum";

@Injectable()
export class ConfigService {
    private envConfig;

    constructor(filePath: string ) {
        dotenv.config({path: filePath})
        this.envConfig = this.validateEnv();
    }

    get name(): string {
        return this.envConfig.APP_NAME;
    }

    get stage(): Stage {
        return this.envConfig.STAGE as Stage;
    }

    get port(): number {
        return this.envConfig.PORT;
    }
    get mongoUri(): string {
        if(this.envConfig.STAGE === Stage.DEV){
            return `mongodb://${this.envConfig.MONGO_USER}:${this.envConfig.MONGO_PASS}@${this.envConfig.MONGO_HOST}`;
        }

        return `mongodb://${this.envConfig.MONGO_USER}:${this.envConfig.MONGO_PASS}@${this.envConfig.MONGO_HOST}/${this.envConfig.MONGO_DB}`;
    }

    get mongoDbName(): string {
        return this.envConfig.MONGO_DB;
    }

    get mongoUser(): string {
        return this.envConfig.MONGO_USER;
    }

    get mongoPass(): string {
        return this.envConfig.MONGO_PASS;
    }

    get jwtSecret(): string {
        return this.envConfig.JWT_SECRET;
    }

    get jwtExpiry(): string {
        return this.envConfig.JWT_EXPIRY;
    }

    private validateEnv() {
        const envVarsSchema: Joi.ObjectSchema = Joi.object({
            APP_NAME: Joi.string().required(),
            STAGE: Joi.string().required().valid(...Object.values(Stage)),
            PORT: Joi.number().port().required(),

            MONGO_HOST: Joi.string().required(),
            MONGO_DB: Joi.string().required(),
            MONGO_USER: Joi.string().required(),
            MONGO_PASS: Joi.string().required(),

            JWT_SECRET: Joi.string().required(),
            JWT_EXPIRY: Joi.string().required(),
        })

        const { error, value: validatedEnvConfig } = envVarsSchema.validate(process.env, {
            allowUnknown: true,
        })

        if(error){
            throw new Error(`config validation error: ${error.message}`);
        }

        return validatedEnvConfig;
    }
}
