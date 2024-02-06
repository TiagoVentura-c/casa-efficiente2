import { ServiceGetPerson } from '@/services/person'
import { useQuery } from 'react-query'
  

export default function useFetchPerson(key?: string){
    return useQuery(['persons'], ServiceGetPerson)
}