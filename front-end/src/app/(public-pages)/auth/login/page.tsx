'use client'
import { useRouter } from 'next/navigation';
import { Box, Stack, Typography, Divider, FormControl, Checkbox, FormControlLabel,TextField, InputAdornment, } from '@mui/material'
import KeyIcon from '@mui/icons-material/Key';
import LoadingButton from '@mui/lab/LoadingButton';
import ServiceLogin from '@/services/auth';
import { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';

export default function Login(){
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const username = data.get('username') as string
        const password = data.get('password') as string
        setLoading(true)

        try {
            const userData = await ServiceLogin(username, password)
            

            router.push('/plans')
            return

        } catch (error) {
            alert('Falha ao fazer login')
        }
        finally{
            setLoading(false)
        }

    }




    return (
        <Stack direction="column" m={4} alignSelf={'center'} mt={5} >
            <Typography sx={{color: '#344055', fontWeight: '700', fontSize: '25px'}} >Login</Typography>
            <Divider sx={{marginTop: 2}} />
            <Stack direction={'column'} mt={2} sx={{}} >
                <FormControl sx={{width: '60%', alignItems: 'flex-start'}}  component="form" onSubmit={handleSubmit}  >
                    <Box>
                        <Typography color={'#6F7D97'} fontSize={12} >User</Typography>
                        <TextField
                            placeholder='*********'
                            variant="outlined" size='small' sx={{marginTop: 0.2, width: '270px', color: '#6F7D97', fontSize: '18px' }} 
                            id="username"
                            name="username"
                            type="tel"
                            required
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon fontSize='small' />
                                </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <Box mt={1}>
                        <Typography color={'#6F7D97'} fontSize={12} >Password</Typography>
                        <TextField
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <KeyIcon fontSize='small' />
                                </InputAdornment>
                                ),
                            }}
                            id="password" name="password" variant="outlined" size='small' sx={{marginTop: 0.2, width: '270px' }} type='password' placeholder='*********'
                        />
                    </Box>
                   
                    <LoadingButton
                        loading={loading}
                        type="submit"
                        color={'primary'}
                        size="small"
                        loadingPosition="center"
                        variant="contained"
                        sx={{width: '377px', borderRadius: 2, fontWeight: '550', fontSize: '16px', textTransform: 'none', mt: 1  }}
                    >Login
                    </LoadingButton>
                </FormControl>
            </Stack>
        </Stack>
    )
}