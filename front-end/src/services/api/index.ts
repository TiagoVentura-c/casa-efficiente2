import apiManager from "@/api"


export const handleRefreshToken = async (refreshToken: string) => {
    try {
      const res = await apiManager(false)
    //     .put('/HTTP_DApp_RefreshToken/', {}, {
    //       headers: {
    //           "Authorization": `${refreshToken}`,
    //           "Content-Type": "application/json",
    //           "MSISDN": `${context.user?.MSISDN as string}`}})
  
    //   const newToken = res.headers.authorization
    //   const TokenExpiryDate = res.data.TokenExpiryDate
  
    //   const userToSave: User = {
    //     ...context.user as User,
    //     DATE_EXPIRED_TOKEN: getDateToRefreshToken(TokenExpiryDate),
    //     TOKEN: newToken,
    //   }
    //   saveData('userInfo', JSON.stringify(userToSave))
    //   context.setUser(userToSave)
  
    //   console.log('sucess refresh')
      return ''
    } catch (error) {
      throw error
    }
  }