import { css } from '@emotion/react'
import tw, { styled } from 'twin.macro'

export const Container = styled.div(() => [
  tw`
  `,
  css`
    outline: none;
  `
])

export const LoginButton = styled.button(() => [
  tw``,
  css`
    width: 240px;
    height: 40px;
    background-color: #fddc3f;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    color: #3a2929;
    font-size: 15px;
    outline: none;
  `
])

export const KakaoIcon = styled.img(() => [
  tw``,
  css`
    width: 35px;
  `
])
