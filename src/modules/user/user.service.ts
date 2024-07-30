import { Injectable } from '@nestjs/common';
import { Users } from '../../moks/index';

@Injectable()
export class UserService {
  getUsers() {
    return Users;
  }
}
