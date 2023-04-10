import * as dotenv from 'dotenv';
import * as Joi from "joi";
import { Injectable } from '@nestjs/common';
import {Stage} from "../server-enums/stage.enum";

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

    get saltRounds(): number{
        return this.envConfig.SALT_ROUNDS;
    }

    get getSmtpHost(): string{
        return this.envConfig.SMTP_HOST;
    }

    get getSmtpPort(): number{
        return this.envConfig.SMTP_PORT;
    }

    get getSmtpUsername(): string{
        return this.envConfig.SMTP_USERNAME;
    }

    get getSmtpPassword(): string{
        return this.envConfig.SMTP_PASSWORD;
    }

    get getSmtpSender(): string{
        return this.envConfig.SMTP_SENDER;
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

            SALT_ROUNDS: Joi.number().min(10).max(15).required(),

            SMTP_HOST: Joi.string().uri().required(),
            SMTP_PORT: Joi.number().port().required(),
            SMTP_USERNAME: Joi.string().required(),
            SMTP_PASSWORD: Joi.string().required(),
            SMTP_SENDER: Joi.string().email().required()
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
