import {Stage} from '@the-game/common/dist/enum/preferences/stage.enum';
import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private envConfig;

  constructor(filePath: string) {
    dotenv.config({ path: filePath });
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
    if (this.envConfig.STAGE === Stage.DEV) {
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

  get jwtAccessSecret(): string {
    return this.envConfig.JWT_ACCESS_SECRET;
  }

  get jwtRefreshSecret(): string {
    return this.envConfig.JWT_REFRESH_SECRET;
  }

  get jwtAccessExpiry(): string {
    return this.envConfig.JWT_ACCESS_EXPIRY;
  }

  get jwtRefreshExpiry(): string {
    return this.envConfig.JWT_REFRESH_EXPIRY;
  }

  get saltRounds(): number {
    return this.envConfig.SALT_ROUNDS;
  }

  get smtpHost(): string {
    return this.envConfig.SMTP_HOST;
  }

  get smtpPort(): number {
    return this.envConfig.SMTP_PORT;
  }

  get smtpUsername(): string {
    return this.envConfig.SMTP_USERNAME;
  }

  get smtpPassword(): string {
    return this.envConfig.SMTP_PASSWORD;
  }

  get smtpSender(): string {
    return this.envConfig.SMTP_SENDER;
  }

  get smtpSecure(): boolean {
    return this.envConfig.SMTP_TLS === 'true';
  }

  private validateEnv() {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      APP_NAME: Joi.string().required(),
      STAGE: Joi.string()
        .required()
        .valid(...Object.values(Stage)),
      PORT: Joi.number().port().required(),

      MONGO_HOST: Joi.string().required(),
      MONGO_DB: Joi.string().required(),
      MONGO_USER: Joi.string().required(),
      MONGO_PASS: Joi.string().required(),

      JWT_ACCESS_SECRET: Joi.string().required(),
      JWT_REFRESH_SECRET: Joi.string().required(),
      JWT_ACCESS_EXPIRY: Joi.string().required(),
      JWT_REFRESH_EXPIRY: Joi.string().required(),

      SALT_ROUNDS: Joi.number().min(10).max(15).required(),

      SMTP_HOST: Joi.string().hostname().required(),
      SMTP_PORT: Joi.number().port().required(),
      SMTP_USERNAME: Joi.string().required(),
      SMTP_PASSWORD: Joi.string().required(),
      SMTP_SENDER: Joi.string().email().required(),
      SMTP_TLS: Joi.string().allow('true', 'false').required(),
    });

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(
      process.env,
      {
        allowUnknown: true,
      },
    );

    if (error) {
      throw new Error(`config validation error: ${error.message}`);
    }

    return validatedEnvConfig;
  }
}
