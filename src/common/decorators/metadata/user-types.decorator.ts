import { SetMetadata } from '@nestjs/common';

export const UserTypes = (...userTypes: string[]) =>
  SetMetadata('user-types', userTypes);
