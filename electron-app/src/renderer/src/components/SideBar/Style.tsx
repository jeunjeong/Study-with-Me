import { css } from '@emotion/react'
import tw, { styled } from 'twin.macro'

interface GroupsItemProps {
  isSelected: boolean
}

export const Container = styled.div(() => [
  tw`
  `,
  css`
    position: fixed;
    top: 0;
    left: 0;
    width: 40px;
    min-height: 100vh; /* 뷰포트의 100% 높이 */
    max-height: 100%; /* 부모 요소의 높이를 초과하지 않음 */
    background-color: black;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `
])

export const GroupSection = styled.div(() => [
  tw`
  `,
  css`
    margin-top: 15px;
    width: 100%;
  `
])

export const GroupsItem = styled.div<GroupsItemProps>(({ isSelected }) => [
  tw`
  `,
  css`
    width: 40px;
    aspect-ratio: 1 / 1;
    background-color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: 0.3s ease;
    ${isSelected &&
    css`
      background-color: white;
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
  `
])

export const SettingItem = styled.div(() => [
  tw`
  `,
  css`
    width: 100%;
    aspect-ratio: 1 / 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `
])

export const SettingImg = styled.img(() => [
  tw`
  `,
  css`
    width: 80%;
  `
])
