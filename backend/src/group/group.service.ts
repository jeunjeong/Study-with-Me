import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/postgresql-prisma.service';
import { Prisma } from 'prisma/generated/postgresql';

@Injectable()
export class GroupService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createGroupDto: Prisma.GroupCreateInput) {
    return this.prisma.group.create({ data: createGroupDto });
  }

  async findAll() {
    return this.prisma.group.findMany();
  }

  async findOne(id: string) {
    return this.prisma.group.findUnique({ where: { id } });
  }

  async update(
    id: string,
    leaderId: string,
    updateGroupDto: Prisma.GroupUpdateInput,
  ) {
    return this.prisma.group.update({
      data: updateGroupDto,
      where: { id, leaderId },
    });
  }

  async remove(id: string, leaderId: string) {
    return this.prisma.group.delete({ where: { id, leaderId } });
  }

  async createMember(createGroupMemberDto: Prisma.GroupMemberCreateInput) {
    return this.prisma.groupMember.create({ data: createGroupMemberDto });
  }

  async findAllMembers(groupId: string) {
    return this.prisma.groupMember.findMany({ where: { groupId } });
  }

  async findOneMember(groupId: string, memberId: string) {
    return this.prisma.groupMember.findUnique({
      where: {
        groupId_memberId: {
          groupId,
          memberId,
        },
      },
    });
  }

  // async updateMember(
  //   groupId: string,
  //   memberId: string,
  //   updateGroupMemberDto: Prisma.GroupMemberUpdateInput,
  // ) {
  //   throw new NotImplementedException();
  // }

  async removeMember(groupId: string, memberId: string) {
    return this.prisma.groupMember.delete({
      where: {
        groupId_memberId: {
          groupId,
          memberId,
        },
      },
    });
  }
}
