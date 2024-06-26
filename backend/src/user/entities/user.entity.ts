import { Provider } from 'prisma/generated/postgresql';
import { Group } from '../../group/entities/group.entity';
import { GroupMember } from '../../group/entities/groupMember.entity';

export class User {
  id: string;
  email: string;
  name: string;
  provider: Provider;
  ownedGroup?: Group[];
  joinedGroup?: GroupMember[];
}
