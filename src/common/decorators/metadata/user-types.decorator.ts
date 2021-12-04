import { SetMetadata } from '@nestjs/common';

export const UserTypes = (userType) => SetMetadata('user-type', userType);
