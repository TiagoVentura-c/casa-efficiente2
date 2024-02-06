import { ServiceGetCatalogues } from '@/services/dashboard'
import { useQuery } from 'react-query'
  

export default function useFetchCatalogue(key?: string){
    return useQuery(['catalogues', key], ServiceGetCatalogues)
}