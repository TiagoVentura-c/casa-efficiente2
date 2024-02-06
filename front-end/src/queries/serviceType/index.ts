import { ServiceGetServiceTypes } from '@/services/service-types'
import { useQuery } from 'react-query'
  

export default function useFetchServiceType(key?: string){
    return useQuery(['serviceTypes'], ServiceGetServiceTypes)
}