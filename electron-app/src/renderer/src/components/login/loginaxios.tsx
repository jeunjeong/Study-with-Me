import axios, { AxiosResponse } from 'axios'

interface Response {
  accessToken: string
}

export const loginAxios = async (code: string): Promise<any> => {
  try {
    const res: AxiosResponse = await axios.get(
      `https://study-with-me-0d7d91fe.nip.io/auth/kakao?code=${code}`
    )
    return res.data
  } catch (error) {
    console.log(error)
  }
}
