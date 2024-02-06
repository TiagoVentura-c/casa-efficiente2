import { properties as fakeProperties, contracts as fakeContracts } from "@/_data/fake/properties";
import { ServiceType } from "@/_types";
import { Contract, Immobile, Person } from "@/_types/index2";
import apiManager from "@/api";

export async function ServiceGetServiceProperty(){
    try {
        const properties: Immobile[] = fakeProperties
        return properties
    } catch (error) {
        throw error
    }
}

export async function ServiceGetServiceContracts(){
    try {
        const contracts: Contract[] = fakeContracts
        return contracts
    } catch (error) {
        throw error
    }
}

export async function ServiceCreateSendContractRequest(immobile: Immobile, client: Person){
    try {

        /** send request contract */
        const res = await  apiManager().post('contract', {
            
        })

        return res.data.Data
    } catch (error) {
        throw error
    }
}

export async function ServiceEditServiceTypes(ServiceType: ServiceType & { NewKey: string }){
    try {
        const res = await  apiManager().put('HTTP_ServiceType/', {
            "Id": ServiceType.Id,
            "Key" : ServiceType.Key,
	        "Description" : ServiceType.Description,
            "NewKey" : ServiceType.NewKey
        })

        return res.data.Data
    } catch (error) {
        throw error
    }
}
export async function ServiceDeleteServiceTypes(ServiceTypeKey: string){
    try {
        const res = await  apiManager().delete(`HTTP_ServiceType/${ServiceTypeKey}`)
        return true
    } catch (error) {
        throw error
    }
}