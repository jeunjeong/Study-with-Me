import { User } from '../../user/entities/user.entity';
import { GroupMember } from './groupMember.entity';

export class Group {
  id: string;
  name: string;
  leaderId: string;
  leader?: User;
  groupMembers?: GroupMember[];
  createdAt: Date;
}
