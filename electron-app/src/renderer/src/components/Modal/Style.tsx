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
    border-radius: 8px;
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
    font-size: 20px;
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

export const Icon = styled.img(() => [
  tw``,
  css`
    width: 24px;
  `
])

export const MiddleIcon = styled.img(() => [
  tw``,
  css`
    width: 20px;
  `
])

export const SmallIcon = styled.img(() => [
  tw``,
  css`
    width: 16px;
  `
])

export const InputTag = styled.input(() => [
  tw``,
  css`
    border-width: 0;
    padding: 0;
    width: 100%;
    height: 18px;
    background-color: gray;
    color: white;
    border-radius: 5px;
    outline: none;
    line-height:1.5
    ::-webkit-input-placeholder {
      color: white;
    }
  `
])

export const ImageInputTag = styled.input(() => [
  tw``,
  css`
    border-width: 0;
    padding: 0;
    width: 100px;
    height: 100px;
    background-color: gray;
    color: white;
    border-radius: 5px;
    outline: none;
    ::-webkit-input-placeholder {
      color: white;
    }
  `
])

export const ApplyButton = styled.button(() => [
  tw``,
  css`
    cursor: pointer;
    width: 80px;
    height: 26px;
    background-color: gray;
    color: white;
    border-radius: 5px;
    outline: none;
    display: flex;
    justify-content: space-between;
    padding: 5px;
  `
])

export const ApplyButtonRight = styled.div(() => [
  tw``,
  css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
  `
])
