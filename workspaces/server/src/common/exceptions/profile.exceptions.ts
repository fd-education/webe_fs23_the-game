import { HttpException, HttpStatus } from '@nestjs/common';

export class NoSuchProfileException extends HttpException {
  constructor() {
    super('No such profile to execute action on.', HttpStatus.BAD_REQUEST);
  }
}
