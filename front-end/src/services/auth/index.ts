import apiManager from "@/api"
import Cookie from 'js-cookie'

export default async function ServiceLogin(username: string, password: string) {

        try {
          const res = await apiManager(false).post('/auth/login', {
            'user': username,
            'password': password
          }, )

          const { token, person } = res.data
    
          const currentDate = new Date();
          const oneHourLater = new Date(currentDate.getTime() + 60 * 60 * 1000);
          Cookie.set('access_token', token, {expires: oneHourLater})

          const userJSON = JSON.stringify(person);
          Cookie.set('user', userJSON, {expires: oneHourLater})

          return person
        } catch (error: any) {
          throw error
        }
}

export async function ServiceValidateOtp(otp: string) {

  try {
    if(otp == '123456'){
      Cookie.set('access_token', 'test')
      return true
    }
    else throw 'Invalid otp'
  } catch (error) {
    throw error
  }

}