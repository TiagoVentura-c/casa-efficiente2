import { BundleApi, LocationEntry } from "@/_types"
import { Person } from "@/_types/index2"
import apiManager from "@/api"

export async function ServiceGetPerson(){
    try {
        const data: Person[]  = (await apiManager().get('/person')).data

        return data
    } catch (error) {
        throw error
    }
}

export async function ServiceCreatePerson(person: Person){
    try {
        const res: LocationEntry = await apiManager().post('/person',
            person
        )

        return res
    } catch (error) {
        throw error
    }
}


export async function ServiceUpdatePerson( person: Person){
    try {
        const res: LocationEntry = await apiManager().put('/person',
            person
        )

        return res
    } catch (error) {
        throw error
    }
}


export async function ServiceDeletePerson( persons: number[] ){
    try {
        for(const id of persons){
            try {
                await apiManager().delete(`/person`, {
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