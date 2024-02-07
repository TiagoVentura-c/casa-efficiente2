export type Immobile = {
    id?: number
    name: string
    type: 'RESIDENCIAL' | 'COMERCIAL'
    isAvailable: boolean
    price: number
    typePropertyBusiness: 'ALUGUEL' | 'VENDA'
    description: string
    dimention: {
        height: number
        width: number
        length: number
    }
    location: {
        country: string
        province: string
        address: string
        lat: string,
        lon: string
        isBuilding: boolean
    }
    ratingAverage?: number
    photos?: {
        "albumId": number,
        "id": number,
        "title": string,
        "url": string,
      }[],
    broker: Person | { id: number}
}

export type Person = {
    id?: number
    firstName: string
    lastName: string
    nationalId: string
    address: string
    type?: 'BROKER' | 'CLIENT' | 'ADMIN'
    email?: string
    user?: string
    password?: string
}

export type Contract = {
    id?: number
    client: Person
    broker: Person
    typePropertyBusiness: 'ALUGUEL' | 'VENDA'
    startDate: string
    endDate?: string
    immobile: Immobile
    totalPaid: number
    contractTimeInDays?: number
    statusContract? : 'APPROVED' | "PENDING"
    clientDescription?: string
}