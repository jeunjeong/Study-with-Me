import axios, { AxiosResponse } from 'axios'

export const loginAxios = async (code: string): Promise<AxiosResponse | undefined> => {
  try {
    const res: AxiosResponse = await axios.get(
      `${import.meta.env.VITE_DOMAIN}/oauth/kakao-callback?code=${code}`,
      {
        withCredentials: true
      }
    )
    return res
  } catch (error) {
    console.log(error)
    return
  }
}

export const getauth = async (): Promise<AxiosResponse | undefined> => {
  try {
    const res: AxiosResponse = await axios.get(`${import.meta.env.VITE_DOMAIN}/auth`, {
      withCredentials: true
    })
    return res
  } catch (error) {
    console.log(error)
    return
  }
}
