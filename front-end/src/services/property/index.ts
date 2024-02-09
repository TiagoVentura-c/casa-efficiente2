import { ServiceType } from "@/_types";
import { Contract, Immobile, Person } from "@/_types/index2";
import apiManager from "@/api";

export async function ServiceGetServiceProperty(){
    try {
        return []
    } catch (error) {
        throw error
    }
}

export async function ServiceGetServiceContracts(){
    try {
        return []
    } catch (error) {
        throw error
    }
}

export async function ServiceGetServicePendingContracts(){
    try {
        const contracts: Contract[] = (await apiManager().get('/contract')).data
        return contracts
    } catch (error) {
        throw error
    }
}

export async function ServiceGetServiceApprovedContracts(){
    try {
        const contracts: Contract[] = (await apiManager().get('/contract/get-approved')).data
        return contracts
    } catch (error) {
        throw error
    }
}

export async function ServiceGetServiceApprovedContractsClient(id: number){
    try {
        const contracts: Contract[] = (await apiManager().get('/contract/get-approved', {
            data: {
                "id": id
            }
        })).data
        return contracts
    } catch (error) {
        throw error
    }
}

export async function ServiceAproveServicePendingContracts(contrat: Contract){
    try {
        const res = await apiManager().post('/contract/approve', {
            id: contrat.id
        })


        return res.data
    } catch (error) {
        throw error
    }
}

export async function ServiceCreateSendContractRequest(immobile: Immobile, client: Person, totalPaid: number, clientDescription: string){
    try {
        /** send request contract */
        const res = await  apiManager().post('contract', {
            "typePropertyBusiness": immobile.typePropertyBusiness,
            "client": {
                "id": client.id
            },
            "broker": {
                "id": immobile.broker.id
            },
            "immobile": {
                "id": immobile.id
            },
            "startDate": "2024-01-28",
            "totalPaid": totalPaid,
            "clientDescription": clientDescription
        })

        return res.data.Data
    } catch (error) {
        throw error
    }
}

export async function ServiceEditServiceTypes(ServiceType: ServiceType & { NewKey: string }){
    try {
  
    } catch (error) {
        throw error
    }
}
export async function ServiceDeleteServiceTypes(ServiceTypeKey: string){
    try {
       
    } catch (error) {
        throw error
    }
}