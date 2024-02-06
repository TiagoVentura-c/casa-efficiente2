import { CircularProgressbar, buildStyles, CircularProgressbarWithChildren  } from 'react-circular-progressbar';
import ChangingProgressProvider from './ChangingProgressProvider';
import { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import BoxBorder from './BoxBorder';
import CloudIcon from '@mui/icons-material/Cloud';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import SmsIcon from '@mui/icons-material/Sms';
import { SubscriptionItem, SubscriptionType } from '@/_types';
import { getNameSubscriptionForSubscriptionService } from '@/helpers';

type Props = {
  subscription: SubscriptionItem
}

export default function Progress({ subscription }: Props){
  

  const [percentage, setPercentage] = useState([0, 80])

  useEffect(() => {
    setTimeout(() =>{
      setPercentage([80])
    }, 100)
  }, [])

  return (
    <BoxBorder padding={4} width={160} height={150} paddingTop={3} >
      <ChangingProgressProvider  values={percentage}  >
        {value => (
          <CircularProgressbarWithChildren 
            value={value}
            circleRatio={0.75}
            styles={buildStyles({
              rotation: 1 / 2 + 1 / 8,
              strokeLinecap: "round",
              trailColor: "#c1edea",
              pathColor: `#08B7AC`,
              pathTransitionDuration: 1,
              
            })}
        >
          <Stack direction={'column'} alignItems={'center'} mt={-3} >
              <Stack direction={'row'} color={'#08B7AC'} spacing={0.5} >
                {getIconBasedOnSubscriptionService(subscription.type)}
                <Typography  sx={{ fontSize: '12px', fontWeight: '500', }}>{subscription.type}</Typography>
              </Stack>
              <Typography sx={{ fontSize: '20px', fontWeight: '500', }} >{subscription.remaining} {getNameSubscriptionForSubscriptionService(subscription.type)}</Typography>
              <Typography sx={{ fontSize: '14px', fontWeight: '400', letterSpacing: -1 }} >of {subscription.total} {getNameSubscriptionForSubscriptionService(subscription.type)} left</Typography>
              <Typography>More</Typography>
          </Stack>
        </CircularProgressbarWithChildren>
        )}
      </ChangingProgressProvider>

    </BoxBorder>
  )
}

const getIconBasedOnSubscriptionService = (type: SubscriptionType) => {
  switch (type){
    case SubscriptionType.Data:
      return <CloudIcon fontSize={'small'} />
    case SubscriptionType.Voice:
      return <LocalPhoneIcon fontSize={'small'}  />
    case SubscriptionType.SMS:
      return <SmsIcon fontSize={'small'}  />
    default: 
      return <CloudIcon />
  }
}