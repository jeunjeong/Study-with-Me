import { css } from '@emotion/react'
import tw, { styled } from 'twin.macro'

export const Container = styled.div(() => [
  tw`
    items-center fixed top-0 w-screen pl-4 
  `,
  css`
    background-color: rgba(193, 215, 197, 1);
    color: black;
    height: 4.5rem;
    align-items: center;
  `
])

export const Content = styled.div(() => [
  tw`flex `,
  css`
    height: 100%;
    align-items: center;
  `
])

export const Button = styled.div(() => [
  tw`
    `,
  css`
    background-color: pink;
    width: 45px;
    height: 45px;
    margin: 2.5px;
  `
])
