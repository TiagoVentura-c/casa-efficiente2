'use client'
import { useRouter } from 'next/navigation'
import {useEffect, useState} from 'react'

export default function App(){
    const router = useRouter()

    useEffect(() => {
        router.push('/dashboard')
    }, [])
    

    return(
        <div>/auth</div>
    )
}