import { Stack, Typography } from '@mui/material'
import Image from 'next/image'

export default function PackageDetaill(){

    return (
        <Stack direction={'row'} spacing={2} >  
            <IconAndText iconUrl={'bag.png'} text='Afrinet 4GB' />
            <IconAndText iconUrl={'duration.png'} text='30 days' />
            <IconAndText iconUrl={'price-tag.png'} text='200 kz' />
        </Stack>
    )
}

export function IconAndText( {text, iconUrl}: {text: string, iconUrl: string} ){
    return(
        <Stack direction={'row'} spacing={0.5} >
            <Image unoptimized={true} src={`/images/${iconUrl}`} alt="image" width={21} height={21} />
            <Typography>{text}</Typography>
        </Stack>
    )
}