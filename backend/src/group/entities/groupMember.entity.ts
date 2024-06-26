import { Group } from './group.entity';
import { User } from '../../user/entities/user.entity';

export class GroupMember {
  groupId: string;
  group?: Group;
  memberId: string;
  member?: User;
  joinedAt: Date;
}
