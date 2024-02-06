import { LocationEntry } from "@/_types"
import { Immobile, Person } from "@/_types/index2"
import apiManager from "@/api"

export async function ServiceGetImmobile(){
    try {
        const data: Immobile[]  = (await apiManager().get('/immobile')).data

        return data
    } catch (error) {
        throw error
    }
}

export async function ServiceCreateImmobile(item: Immobile){
    try {
        const res: LocationEntry = await apiManager().post('/immobile',
        item
        )

        return res
    } catch (error) {
        throw error
    }
}


export async function ServiceUpdateUpdate( item: Immobile){
    try {
        const res: LocationEntry = await apiManager().put('/immobile',
            item
        )

        return res
    } catch (error) {
        throw error
    }
}


export async function ServiceDeleteImmobile( items: number[] ){
    try {
        for(const id of items){
            try {
                await apiManager().delete(`/immobile`, {
                    data: {
                        id: id
                    }
                })
            } catch (error) {
                continue
            }
        }
        return 
    } catch (error: any) {
        throw error
    }
}