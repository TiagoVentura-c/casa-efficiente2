import { ServiceGetLocationEntry } from '@/services/locationEntry'
import { useQuery } from 'react-query'
  

export default function useFetchLocationEntry(key?: string){
    return useQuery(['locationEntry'], ServiceGetLocationEntry)
}