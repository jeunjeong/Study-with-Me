import { css } from '@emotion/react'
import tw, { styled } from 'twin.macro'

export const Container = styled.div(() => [
  tw`
    items-center relative top-0 w-screen pl-4 
  `,
  css`
    background-color: rgba(193, 215, 197, 1);
    color: black;
    height: 4.5rem;
  `
])

export const FriendListDiv = styled.div(() => [
  tw`
  flex flex-row items-center
`,
  css`
    height: 100%;
  `
])

type StatusType = 'studying' | 'resting' | 'nothing'

interface ImgProps {
  status: StatusType
}

export const Img = styled.img<ImgProps>(({ status }) => [
  tw`
    rounded-full
  `,
  css`
    background-color: white;
    width: 45px;
    height: 45px;
    padding: 2.5px;
    border: 2.8px solid
      ${status === 'studying' ? 'red' : status === 'resting' ? 'blue' : 'transparent'};
  `
])

export const ImgContainer = styled.div(() => [
  tw`
    mr-2
  `,
  css`
    heigit: 100%;
  `
])

export const Imgdiv = styled.div(() => [
  tw`
    flex flex-col items-center text-sm	
  `,
  css`
    height: 100%;
  `
])
