import { Contract, Immobile, Person } from "@/_types/index2";

export const properties: Immobile[] = [
    {
        name: 'Casa no Talatona',
        description: 'Uma casa de 3 quartos 1 quarto de banho',
        dimension: {
            height: 20,
            length: 40,
            width: 100
        },
        typePropertyBusiness: "Alugar",
        location: {
            country: 'Angola',
            province: 'Luanda',
            address: 'Talatona rua 3 bairro 11',
            isBuilding: false,
            lat: '1054',
            lon: '-7845.225'
        },
        price: 100000,
        isAvailable: true,
        typeProperty: 'Residencial',
        photos: [
            {
                albumId: 1,
                id: 1,
                title: '',
                url: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'
            },
            {
                albumId: 1,
                id: 1,
                title: '',
                url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d'
            },
            {
                albumId: 1,
                id: 1,
                title: '',
                url: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af'
            },
            {
                albumId: 1,
                id: 1,
                title: '',
                url: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6'
            }
        ]
    },
    {
        name: 'Loga no Cazenga',
        description: 'Uma casa de 1 quartos 1 quarto de banho no cazenga',
        dimension: {
            height: 20,
            length: 40,
            width: 100
        },
        typePropertyBusiness: "Alugar",
        location: {
            country: 'Angola',
            province: 'Luanda',
            address: 'Talatona rua 3 bairro 11',
            isBuilding: false,
            lat: '1054',
            lon: '-7845.225'
        },
        price: 100000,
        isAvailable: true,
        typeProperty: 'Comercial',
    },
    {
        name: 'Casa bonita em Viana',
        description: 'Uma casa de 1 quartos 1 quarto de banho em Viana',
        dimension: {
            height: 300,
            length: 40,
            width: 10
        },
        typePropertyBusiness: "Vender",
        location: {
            country: 'Angola',
            province: 'Luanda',
            address: 'Talatona rua 3 bairro 11',
            isBuilding: false,
            lat: '1054',
            lon: '-7845.225'
        },
        price: 100000,
        isAvailable: true,
        typeProperty: 'Residencial',
        photos: []
    }
]

export const person1: Person = {
    firstName: 'Tiago',
    lastName: 'Ventura',
    nationalId: '002564254BA34',
    address: 'Luanda, Angola',
    email: 'tiago@test.com',
    type: 'Client',
    user: 'tvnentura'
}

export const person2: Person = {
    firstName: 'Julio',
    lastName: 'Fabio',
    nationalId: '002564254BA34',
    address: 'Cabinda, Angola',
    email: 'test@test.com',
    type: 'Broker',
    user: 'jfabio'
}

export const contracts: Contract[] = [
    {
        broker: person2,
        client: person1,
        typeContract: 'Alugar',
        immobile: properties[0],
        endDate: '10-06-2023',
        startDate: '10-01-2023',
        totalPaid: 5200,
        contractTimeInDays: 120
    },
    {
        broker: person2,
        client: person1,
        typeContract: 'Vender',
        immobile: properties[2],
        startDate: '30-01-2023',
        totalPaid: 5211.22
    }
]