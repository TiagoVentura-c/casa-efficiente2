import { ServiceGetLocationArea } from '@/services/locationArea'
import { useQuery } from 'react-query'
  

export default function useFetchLocationArea(key?: string){
    return useQuery(['locationArea'], ServiceGetLocationArea)
}