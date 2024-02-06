'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Stack, Typography, Divider, FormControl, } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import OTPInput from 'react-otp-input';
import { ServiceValidateOtp } from '@/services/auth';

export default function ValidateOtp(){

    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleValidateOtp = async () => {
        setLoading(true)
        try {
            await ServiceValidateOtp(otp)
            router.push('/dashboard')
        } catch (error) {
            setOtp('')
            alert(error)
        }
        finally{
            setLoading(false)
        }
    }

    return (
            <Stack direction="column" m={4}  >
                <Typography sx={{color: '#344055', fontWeight: '700', fontSize: '25px'}} >OTP verification</Typography>
                <Typography mt={3} sx={{color: '#B6B8C3', fontSize: '12px'}} >We have sent an OTP code  to 959*****33</Typography>
                <Divider sx={{marginTop: 2}} />
                <Stack direction={'column'} mt={2} sx={{}} >
                    <FormControl sx={{width: '60%', alignItems: 'flex-start'}} >
                        <Box sx={{display: 'flex', alignContent: 'center'}} >
                            <OTPInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderSeparator={<div style={{width: 5}}></div>}
                                renderInput={(props) => <input {...props} style={{width: '40px', height: '40px', fontSize: 25, color: '#344055', textAlign: 'center' }} />}
                            />
                        </Box>
                        <Stack direction={'column'} width={323} mt={4} > <Typography sx={{lineHeight: 1, color: '#5E6F88'}} >Didn’t received the OTP?</Typography><Typography sx={{lineHeight: 1, color: '#A01775'}} >Resend OTP</Typography></Stack>
                        <LoadingButton
                            loading={loading}
                            onClick={handleValidateOtp}
                            size="small"
                            loadingPosition="center"
                            variant="contained"
                            sx={{width: '377px', backgroundColor: '#A01775', fontWeight: '550', fontSize: '16px', textTransform: 'none', marginTop: 2 }}
                        >Verify
                        </LoadingButton>
                    </FormControl>
                </Stack>
            </Stack>
    )
}