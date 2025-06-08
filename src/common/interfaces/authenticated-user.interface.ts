import { Request } from 'express';
import { User } from 'src/users/entities/user.entity';

export interface AuthenticatedUser extends Request {
  user: User;
}
