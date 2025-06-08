import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/users/entities/user.entity';

import { ROLE } from '../constants/role.constant';

export const Roles = (role: Role) => SetMetadata(ROLE, role);
