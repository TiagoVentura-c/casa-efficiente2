import { ServiceGetChannels } from '@/services/channels'
import { useQuery } from 'react-query'
  

export default function useFetchChannel(key?: string){
    return useQuery(['channels', key], ServiceGetChannels)
}