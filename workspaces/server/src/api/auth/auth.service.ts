import {Injectable, UnauthorizedException} from '@nestjs/common';
import {ResetPasswordDto} from '../../common/dto/resetPassword.dto';
import { UsersService } from '../../data/users/users.service';
import { RegistrationDto } from '../../common/dto/registration.dto';
import {AuthenticationFailedException, DuplicateUserException} from '../../common/exceptions/auth.exceptions';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from '../../security/bcrypt/bcrypt.service';
import { LoggerService } from '../../common/logger/logger.service';
import { MailService } from '../../common/mail/mail.service';
import { randomBytes } from 'crypto';
import {TokensService} from "../../data/tokens/tokens.service";
import {RequestPasswordResetTokenDto} from "../../common/dto/passwordResetToken.dto";
import {ConfigService} from "../../common/config/config.service";

@Injectable()
export class AuthService {
    constructor(
        private configService: ConfigService,
        private usersService: UsersService,
        private tokensService: TokensService,
        private jwtService: JwtService,
        private bcryptService: BcryptService,
        private mailService: MailService,
        private logger: LoggerService,
    ) {
        this.logger.setContext(AuthService.name);
    }

    async signIn(email: string, pass: string) {
        const user = await this.usersService.findByEmail(email);

        if (
            user === null ||
            !(await this.bcryptService.compare(pass, user.password))
        ) {
            throw new AuthenticationFailedException(email);
        }

        const tokens = await this.getTokens(user.uid, user.username);
        await this.updateRefreshToken(user.uid, tokens.refreshToken);

        return {
            uid: user.uid,
            ...tokens
        };
    }

    async signOut(uid: string) {
        await this.usersService.nullifyRefreshToken(uid);
    }

    async register(registrationDto: RegistrationDto) {
        const userExists = await this.usersService.checkUsernameAndEmail(registrationDto.username, registrationDto.email);
        if(userExists) {
            this.logger.warn(`User with username ${registrationDto.username} or email ${registrationDto.email} already exists`)
            throw new DuplicateUserException();
        }

        const {confirmPassword, ...strippedUser} = registrationDto;

        const secureUser = {
            ...strippedUser,
            password: await this.bcryptService.hash(strippedUser.password)
        }

        await this.usersService.create(secureUser);
    }

    async updateRefreshToken(uid: string, refreshToken: string) {
        const hashedRefreshToken = await this.bcryptService.hash(refreshToken);
        await this.usersService.updateRefreshToken(uid, hashedRefreshToken);
    }

    async refreshTokens(uid: string, refreshToken: string) {
        this.logger.info(`Refreshing tokens for user ${uid}`);

        const user = await this.usersService.findByUid(uid);

        if(user == null || !(await this.bcryptService.compare(refreshToken, user.refresh_token))){
            this.logger.warn(`User '${uid}' tried to refresh tokens with invalid refresh token`);
            throw new UnauthorizedException("Hello World!");
        }

        const tokens = await this.getTokens(user.uid, user.username);
        await this.updateRefreshToken(user.uid, tokens.refreshToken);

        this.logger.info(`Tokens refreshed for user '${user?.username}' (${user?.email})`)
        return {
            uid: user.uid,
            ...tokens
        };
    }

    async sendPasswordResetCode(requestTokenDto: RequestPasswordResetTokenDto) {
        const user = await this.usersService.findByEmail(requestTokenDto.email);

        if(user == null || user.username !== requestTokenDto.username ){
            return;
        }

        const token = randomBytes(4).toString('hex');
        await this.tokensService.create({user_id: user.uid, token});

        this.mailService.sendPasswordResetCode(user, token);
    }

    async resetPassword(resetPasswordDto: ResetPasswordDto) {
        const token = await this.tokensService.findToken(resetPasswordDto.resetCode);

        if(token == null){
            return;
        }

        const uid = token.user_id;
        await this.usersService.updatePassword(uid, resetPasswordDto.password);

        await this.tokensService.delete(token.token);
    }

    private async getTokens(uid: string, username: string){
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    username,
                    uid},
                {
                    secret: this.configService.jwtAccessSecret,
                    expiresIn: this.configService.jwtAccessExpiry}
            ),
            this.jwtService.signAsync(
                {
                    username,
                    uid},
                {
                    secret: this.configService.jwtRefreshSecret,
                    expiresIn: this.configService.jwtRefreshExpiry
                }
            )]);

        return {accessToken, refreshToken};
    }
}
