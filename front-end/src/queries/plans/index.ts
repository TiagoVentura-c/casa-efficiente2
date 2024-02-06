import { ServiceGetPlans } from '@/services/plans'
import { useQuery } from 'react-query'
  

export default function useFetchPlans(key?: string){
    return useQuery(['plans'], ServiceGetPlans)
}