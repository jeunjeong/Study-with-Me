import { css } from '@emotion/react'
import tw, { styled } from 'twin.macro'

export const Container = styled.div(() => [
  tw`
    items-center fixed top-0	left-0 min-h-20 w-screen pl-16 
  `,
  css`
    background-color: rgba(193, 215, 197, 1);
    color: black;
  `
])

export const FriendListDiv = styled.div(() => [
  tw`
  flex flex-row items-center min-h-24
`,
  css``
])

type StatusType = 'studying' | 'resting' | 'nothing'

interface ImgProps {
  status: StatusType
}

export const Img = styled.img<ImgProps>(({ status }) => [
  tw`
    mr-px rounded-full
  `,
  css`
    background-color: white;
    width: 55px;
    height: 55px;
    padding: 2.5px;
    border: 2.8px solid
      ${status === 'studying' ? 'red' : status === 'resting' ? 'blue' : 'transparent'};
  `
])

export const ImgContainer = styled.div(() => [
  tw`
    mr-2
  `,
  css``
])

export const Imgdiv = styled.div(() => [
  tw`
    flex flex-col items-center text-sm	
  `,
  css``
])
