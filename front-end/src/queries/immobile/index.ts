import { ServiceGetImmobile } from '@/services/immbile'
import { useQuery } from 'react-query'
  

export default function useFetchImmobile(key?: string){
    return useQuery(['immobiles'], ServiceGetImmobile)
}