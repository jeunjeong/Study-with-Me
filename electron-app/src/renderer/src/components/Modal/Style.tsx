import { css } from '@emotion/react'
import tw, { styled } from 'twin.macro'

export const Container = styled.div(() => [
  tw``,
  css`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 500px;
    background-color: black;
    padding: 30px;
    z-index: 1000;
    color: white;
  `
])

export const CloseButton = styled.img(() => [
  tw``,
  css`
    position: fixed;
    top: 5%;
    right: 5%;
    width: 25px;
  `
])

export const Title = styled.div(() => [
  tw``,
  css`
    font-size: 24px;
    color: white;
    font-weight: bold;
  `
])

export const MiddleTitle = styled.div(() => [
  tw``,
  css`
    font-size: 16px;
    color: white;
    font-weight: bold;
  `
])

export const SmallTitle = styled.div(() => [
  tw``,
  css`
    font-size: 12px;
    color: white;
    font-weight: bold;
  `
])
