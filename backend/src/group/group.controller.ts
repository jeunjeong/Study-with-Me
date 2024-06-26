import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { UpdateGroupDto } from './dto/update-group.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User as UserParam } from 'src/decorator/user.decorator';
import { AtLeastOne } from 'src/util/type';
import { ConnectUserDto } from 'src/user/dto/connect-user.dto';
import { UserService } from 'src/user/user.service';

class GroupNameDto {
  @ApiProperty()
  groupName: string;
}

@ApiTags('Group')
@Controller('group')
export class GroupController {
  constructor(
    private readonly groupService: GroupService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '그룹 생성',
    description: '',
  })
  async create(
    @UserParam() user: AtLeastOne<ConnectUserDto>,
    @Body() groupDto: GroupNameDto,
  ) {
    const group_info = await this.groupService.create({
      name: groupDto.groupName,
      leader: { connect: user },
    });

    await this.groupService.createMember({
      group: { connect: { id: group_info.id } },
      member: { connect: user },
    });

    return group_info;
  }

  @Get()
  async findAll() {
    console.log('모든 그룹 찾기');
    return await this.groupService.findAll();
  }

  @Get(':groupId')
  async findOne(@Param('groupId') groupId: string) {
    return await this.groupService.findOne(groupId);
  }

  @Patch(':groupId')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '[그룹장] 그룹 정보 수정',
    description: '그룹 이름 변경 가능',
  })
  async update(
    @UserParam() user: AtLeastOne<ConnectUserDto>,
    @Param('groupId') groupId: string,
    @Body() groupDto: GroupNameDto,
  ) {
    const leaderId = (await this.userService.user(user)).id;
    const updateGroupDto: UpdateGroupDto = { name: groupDto.groupName };
    return await this.groupService.update(groupId, leaderId, updateGroupDto);
  }

  @Delete(':groupId')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '[그룹장] 그룹 삭제',
    description: '',
  })
  async remove(
    @UserParam() user: AtLeastOne<ConnectUserDto>,
    @Param('groupId') groupId: string,
  ) {
    const leaderId = (await this.userService.user(user)).id;
    return await this.groupService.remove(groupId, leaderId);
  }

  @Post(':groupId/join')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: ' 그룹 가입',
    description: '',
  })
  async joinGroup(
    @UserParam() user: AtLeastOne<ConnectUserDto>,
    @Param('groupId') groupId: string,
  ) {
    return await this.groupService.createMember({
      group: { connect: { id: groupId } },
      member: { connect: user },
    });
  }

  @Post(':groupId/leave')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: ' 그룹 탈퇴',
    description: '',
  })
  async leaveGroup(
    @UserParam() user: AtLeastOne<ConnectUserDto>,
    @Param('groupId') groupId: string,
  ) {
    const userId = (await this.userService.user(user)).id;
    return await this.groupService.removeMember(groupId, userId);
  }

  @Get(':groupId/member')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '[그룹장] 그룹 전체 멤버 불러오기',
    description: '',
  })
  findAllMembers(
    @UserParam() user: AtLeastOne<ConnectUserDto>,
    @Param('groupId') groupId: string,
  ) {
    return this.groupService.findAllMembers(groupId);
  }

  @Get(':groupId/member/:userId')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '[그룹장] 그룹 멤버 찾기',
    description: '',
  })
  findOneMember(
    @UserParam() user: AtLeastOne<ConnectUserDto>,
    @Param('groupId') groupId: string,
    @Param('memberId') memberId: string,
  ) {
    return this.groupService.findOneMember(groupId, memberId);
  }

  // @Patch(':groupId/member/:userId')
  // @UseGuards(AuthGuard('jwt'))
  // @ApiBearerAuth('accessToken')
  // @ApiOperation({
  //   summary: '',
  //   description: '',
  // })
  // updateMember(
  //   @Param('groupId') groupId: string,
  //   @Param('memberId') memberId: string,
  //   @Body() updateGroupMemberDto: UpdateGroupMemberDto,
  // ) {
  //   throw new NotImplementedException();
  // }

  @Delete(':groupId/member/:userId')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '[그룹장] 멤버 삭제',
    description: '',
  })
  async removeMember(
    @UserParam() user: AtLeastOne<ConnectUserDto>,
    @Param('groupId') groupId: string,
    @Param('memberId') memberId: string,
  ) {
    const leaderId = (await this.userService.user(user)).id;
    const group_info = await this.groupService.findOne(groupId);

    if (leaderId !== group_info.leaderId) {
      throw new UnauthorizedException();
    }
    return this.groupService.removeMember(groupId, memberId);
  }
}
