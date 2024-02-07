import { ServiceGetServiceApprovedContracts, ServiceGetServiceApprovedContractsClient, ServiceGetServicePendingContracts } from '@/services/property'
import { useQuery } from 'react-query'
  

export default function useFetchPendingContract(key?: string){
    return useQuery(['contracts'], ServiceGetServicePendingContracts)
}

export function useFetchApprovedContract(key?: string){
    return useQuery(['contracts-approved'], ServiceGetServiceApprovedContracts)
}

// export function useFetchApprovedContractClient(key?: string){
//     return useQuery(['contracts-approved-client'], ServiceGetServiceApprovedContractsClient)
// }