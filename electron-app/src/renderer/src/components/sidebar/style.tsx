import { css } from '@emotion/react'
import tw, { styled } from 'twin.macro'

interface GroupsItemProps {
  isSelected: boolean
}

export const Container = styled.div(() => [
  tw`
  top-0 left-0 h-screen w-14
  `,
  css`
    background-color: black;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  `
])

export const GroupSection = styled.div(() => [
  tw`
  `,
  css`
    margin-top: 15px;
    width: 100%;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
  `
])

export const GroupsItem = styled.div<GroupsItemProps>(({ isSelected }) => [
  tw`
  `,
  css`
    width: 56px;
    aspect-ratio: 1 / 1;
    background-color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: 0.3s ease;
    cursor: pointer;
    ${isSelected &&
    css`
      background-color: white;
    `}
    ${!isSelected &&
    css`
      &:hover {
        background-color: #7a7a7a;
      }
    `}
  `
])

export const GroupsImg = styled.img(() => [
  tw`
  `,
  css`
    border-radius: 10px;
    width: 80%;
  `
])

export const SettingSection = styled.div(() => [
  tw`
  `,
  css`
    width: 100%;
    margin-bottom: 15px;
    cursor: pointer;
  `
])

export const SettingImg = styled.img(() => [
  tw`
  `,
  css`
    width: 80%;
  `
])
