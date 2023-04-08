import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {User} from "./user.schema";
import {Model} from "mongoose";
import {UserDto} from "../../common/dto/user.dto";
import {BcryptService} from "../../security/bcrypt/bcrypt.service";
import {LoggerService} from "../../common/logger/logger.service";

@Injectable()
export class UsersService{
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private bcryptService: BcryptService,
        private logger: LoggerService)
    {
        this.logger.setContext(UsersService.name);
    }

    async create(createUserDto: UserDto): Promise<User>{
        const hashedPassword = await this.bcryptService.hashPassword(createUserDto.password);

        const secureUser: UserDto = {
            ...createUserDto,
            password: hashedPassword
        }

        return await this.userModel.create(secureUser);
    }

    async findByUid(uid: string): Promise<User | null>{
        return await this.userModel.findOne({uid: uid}).lean().select(['-__v', '-_id']);
    }

    async findByEmail(email: string): Promise<User | null>{
        return await this.userModel.findOne({email: email}).lean().select(['-__v', '-_id']);
    }

    async checkUsernameAndEmail(username: string, email: string): Promise<Boolean>{
        const users = await this.userModel.find({$or: [{email: email}, {username: username}]});

        // return true if a user is found, true otherwise
        return users.length > 0;
    }

    async update(updateUserDto: UserDto): Promise<User>{
        const hashedPassword = await this.bcryptService.hashPassword(updateUserDto.password);

        const secureUpdateUser: UserDto = {
            ...updateUserDto,
            password: hashedPassword
        }

        const updatedUser = new this.userModel(secureUpdateUser);

        return updatedUser.save();
    }

    async delete(uid: string): Promise<User | null> {
        return await this.userModel.findOneAndDelete({uid: uid}).lean().select(['-__v', '-_id']);
    }
}