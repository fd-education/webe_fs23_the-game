import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {User} from "./user.schema";
import {Model} from "mongoose";
import {UserDto} from "./user.dto";

@Injectable()
export class UsersService{
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async create(createUserDto: UserDto): Promise<User>{
        const createdUser = new this.userModel(createUserDto);

        return createdUser.save();
    }

    async findByUid(uid: string): Promise<User>{
        const user = await this.userModel.findOne({uid: uid});

        if(user == null){
            // TODO: correctly handle user not existing!
            return new User();
        }

        return user;
    }

    async findByEmail(email: string): Promise<User>{
        const user = await this.userModel.findOne({email: email});

        if(user == null){
            // TODO: correctly handle user not existing!
            return new User();
        }

        return user;
    }

    async checkUsernameAndEmail(username: string, email: string): Promise<Boolean>{
        const users = await this.userModel.find({$or: [{email: email}, {username: username}]});

        // return true if a user is found, true otherwise
        return users.length > 0;
    }

    async update(updateUserDto: UserDto): Promise<User>{
        const updatedUser = new this.userModel(updateUserDto);

        return updatedUser.save();
    }

    async delete(uid: string): Promise<User> {
        const deletedUser = await this.userModel.findOneAndDelete({uid: uid});

        if(deletedUser == null){
            // TODO: correctly handle user not existing!
            return new User();
        }

        return deletedUser;
    }
}