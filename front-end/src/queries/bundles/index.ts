import { ServiceGetBundle } from '@/services/bundles'
import { useQuery } from 'react-query'
  

export default function useFetchBundle(key?: string){
    return useQuery(['bundles', key], ServiceGetBundle)
}