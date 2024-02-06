import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { Box, Button, Divider, FormControl, FormHelperText, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack } from "@mui/material";
import { useState } from "react";

export default function AddNewAccount(){

    const [age, setAge] = useState('10');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    return(
        <Box>
            <Stack direction={'row'} component="form" sx={{ m: 1,  }}  spacing={5} alignItems={'center'} >
                <FormHelperText id="outlined-weight-helper-text" sx={{minWidth: 150, }} >Type account:</FormHelperText>
                <Select
                    size="small"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                    sx={{ }}
                >
                    <MenuItem value={10}>Service Account</MenuItem>
                    <MenuItem value={30}>Key Account</MenuItem>
                </Select>
            </Stack>
            <Stack direction={'row'} component="form" sx={{ m: 1,  }} spacing={5} alignItems={'center'} >
                <FormHelperText id="outlined-weight-helper-text" sx={{minWidth: 150,}} >Africell phone number:</FormHelperText>
                <OutlinedInput
                    size="small"
                    id="outlined-adornment-weight"
                    startAdornment={<InputAdornment sx={{marginRight: 0.5}} position="end">+244 </InputAdornment>}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                    'aria-label': 'weight',
                    }}
                />
            </Stack>

            <Stack direction={'row'} component="form" sx={{ m: 1,  }} spacing={5} alignItems={'center'} >
                    <FormHelperText id="outlined-weight-helper-text" sx={{minWidth: 150, }}>Password:</FormHelperText>
                    <OutlinedInput
                        
                        size="small"
                        id="outlined-adornment-weight"
                        startAdornment={<InputAdornment sx={{marginRight: 0.5}} position="end"> </InputAdornment>}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                        'aria-label': 'weight',
                        }}
                        />
            </Stack>
            
            <Footer />
        </Box>
    )
}


function Footer () {

    return(
        <Box sx={{position: 'absolute', bottom: 0,
            left: 0,
            width: '97%',
            padding: 2,
            textAlign: 'center',}} 
        >
            <Divider />
            <Stack direction={'row'} sx={{ justifyContent: 'flex-end', }} >
                <Button sx={{ textTransform: 'none', mt: 1.5 }} >Cancel</Button>
                <LoadingButton
                    disabled
                    color={'primary'}
                    size="small"
                    loadingPosition="center"
                    variant="contained"
                    sx={{ borderRadius: 2, fontWeight: '550', fontSize: '16px', textTransform: 'none', mt: 1, alignSelf: 'center'  }}
                >Create
                </LoadingButton>
            </Stack>
        </Box>
    )
}
