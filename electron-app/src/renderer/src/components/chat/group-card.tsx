import React from 'react'
import * as c from './style'
import { GroupInfo } from './type'

interface GroupCardProps {
  onClick: (groupId: number) => void
  groupInfo: GroupInfo
  roomId: number
}

function GroupCard({ onClick, groupInfo, roomId }: GroupCardProps): JSX.Element {
  const { id, name, members, img } = groupInfo

  console.log()

  return (
    <React.Fragment>
      <c.GroupCard onClick={() => onClick(roomId)}>
        <c.GroupImage src={img} alt="groupImg" />
        <c.ChatSummary>
          <c.GroupName>{name}</c.GroupName>
          <c.GroupText>
            here is test description i want to cut this long texttttttttttttttttt
          </c.GroupText>
        </c.ChatSummary>
        <c.GroupStatus>
          <c.Time>오후 01:23</c.Time>
          <c.UnreadMessage>5</c.UnreadMessage>
        </c.GroupStatus>
      </c.GroupCard>
    </React.Fragment>
  )
}

export default GroupCard
