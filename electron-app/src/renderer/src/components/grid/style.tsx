import { css } from '@emotion/react'
import tw, { styled } from 'twin.macro'

export const Container = styled.div(() => [
  tw`
  `,
  css``
])

export const GridDiv = styled.div(() => [
  tw``,
  css`
    padding: 5px;
    width: 100%;
  `
])

export const GridButton = styled.div(() => [
  tw`
  `,
  css`
    width: 120px;
    height: 20px;
    border-radius: 6px;
    background-color: pink;
    cursor: pointer;
  `
])

export const Test = styled.div(() => [
  tw`
    grid grid-flow-dense grid-cols-6 grid-rows-5 gap-4 
  `,
  css`
    height: 80vh;
  `
])

export const Square = styled.div(() => [
  tw`
    row-span-2
  `,
  css`
    background-color: pink;
  `
])
export const Square2 = styled.div(() => [
  tw`
    row-span-2 col-span-2
  `,
  css`
    background-color: pink;
  `
])

export const test1 = styled.div(() => [
  tw`
    bg-pink-200 h-full row-span-2
  `,
  css``
])

export const test2 = styled.div(() => [
  tw`
  bg-pink-300 h-full row-span-4
  `,
  css``
])
