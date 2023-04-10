import { Injectable } from '@nestjs/common';
import { UsersService } from '../../data/users/users.service';
import { NoSuchProfileException } from '../../common/exceptions/profile.exceptions';
import { PasswordDto, ProfileDto } from '../../common/dto/profile.dto';
import { BcryptService } from '../../security/bcrypt/bcrypt.service';

@Injectable()
export class ProfileService {
  constructor(
    private userService: UsersService,
    private bcryptService: BcryptService,
  ) {}

  async getProfile(uid: string): Promise<ProfileDto> {
    const user = await this.userService.findByUid(uid);

    if (user === null) {
      throw new NoSuchProfileException();
    }

    const { password, ...result } = user;

    return result;
  }

  async deleteProfile(uid: string): Promise<ProfileDto> {
    const user = await this.userService.delete(uid);

    if (user === null) {
      throw new NoSuchProfileException();
    }

    const { password, ...result } = user;

    return result;
  }

  async updateProfile(profileUpdate: ProfileDto) {
    const user = await this.userService.update(profileUpdate);

    if (user === null) {
      throw new NoSuchProfileException();
    }

    return user;
  }

  async updatePassword(passwordUpdate: PasswordDto) {
    const hashedPassword = await this.bcryptService.hashPassword(
      passwordUpdate.password,
    );
    const user = await this.userService.updatePassword(
      passwordUpdate.uid,
      hashedPassword,
    );

    if (user === null) {
      throw new NoSuchProfileException();
    }

    return user;
  }
}
