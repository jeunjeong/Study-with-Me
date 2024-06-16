import React from 'react'
import * as c from './style'

interface Group {
  groupId: number
  name: string
  newMessage: boolean
  // 아마도 이미지는 url 이지 않을까
  img: string
}

interface GroupCardProps {
  onClick: (groupId: number) => void
  groupInfo: Group
}

function GroupCard({ onClick, groupInfo }: GroupCardProps): JSX.Element {
  const { groupId, name, newMessage, img } = groupInfo

  console.log()

  return (
    <React.Fragment>
      <c.GroupCard onClick={() => onClick(groupInfo.groupId)}>
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
