import { Avatar, Box, Chip, Stack, Typography } from "@mui/material";
import BoxBorder from "./BoxBorder";
import {  VariantType, useSnackbar } from 'notistack';
import Image from "next/image";
import { Bundle } from "@/_types";
import { Typebundle } from "@/_types";
import { useRouter } from "next/navigation";
import { CardAnimation } from "./dashboard/summary/cardBalance";

type Props = {
    bundle: Bundle
}

export default function CardBundle({bundle}: Props){
    const { enqueueSnackbar } = useSnackbar();
    const navigation = useRouter()
    
    const handleClick = (variant: VariantType) => () => {
        navigation.push('/purchase/545656')
    };

    return(
        <CardAnimation>
            <BoxBorder   width={220} height={130} >
                <Stack direction={'row'}  margin={2} >
                    <Box flex={1} >
                        <Avatar sx={{ bgcolor: '#A92680', }}> <Image unoptimized={true} src={`/images/${getIconBasedOnServiceType(bundle.ServiceType)}`} alt="image" width={30} height={30} /></Avatar>
                    </Box>
                    <Chip label={<Typography sx={{color: '#00AE4E', fontSize: '12px', fontWeight: '500'}} >{bundle.ValidityType ?bundle.ValidityType: 'No validit' }</Typography>}  sx={{bgcolor: '#E5FFF1'}} />
                </Stack>
                <Stack direction={'column'} margin={2} >
                    <Typography sx={{color: '#001733', fontSize: '14px', fontStyle: 'italic' }} >{bundle.Name_PT}</Typography>
                    <Typography>KZ {bundle.Price}</Typography>
                </Stack>
            </BoxBorder>
        </CardAnimation>
    )
}

function getIconBasedOnServiceType(serviceType: Typebundle){
    switch (serviceType) {
        case Typebundle.Voice:
            return 'call_cicle.png'
        case Typebundle.Data:{
            return 'world.png'
        }
        case Typebundle.Credit:
            return 'credit_card.png'
    }
}
