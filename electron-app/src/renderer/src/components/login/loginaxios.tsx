import axios, { AxiosResponse } from 'axios'

export const loginAxios = async (code: string): Promise<any> => {
  try {
    const res: AxiosResponse = await axios.get(
      `${import.meta.env.VITE_DOMAIN}/oauth/kakao-callback?code=${code}`
    )
    return res
  } catch (error) {
    console.log(error)
  }
}
