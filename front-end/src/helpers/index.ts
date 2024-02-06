import { SubscriptionType } from "@/_types";

export const getNameSubscriptionForSubscriptionService = (type: SubscriptionType) => {
    switch (type){
        case SubscriptionType.Data:
            return 'GB'
        case SubscriptionType.SMS:
            return 'Sms'
        case SubscriptionType.Voice:
            return 'Mins'
        
    }
}



export const verifyDateToRefreshToken = (date: string | null) => {
    if(date){
      const dateToken = new Date(date)
      const currentDate = new Date()
      return dateToken < currentDate ? true: false
    }
  
    return true
  }