import { Box, Grid, InputAdornment, TextField, TextFieldProps, Typography } from "@mui/material";

export default function TInput( props: TextFieldProps & {
    title: string,
} ){
    return (
        <Box mb={3} >
            <Typography color={'#6F7D97'} fontSize={12} >{props.title}</Typography>
            <TextField
                required={false}
                variant="outlined" size='small' sx={{marginTop: 0.2, width: '270px', color: '#6F7D97', fontSize: '18px' }} 
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                    </InputAdornment>
                    ),
                }}
                {...props}
            />
        </Box>
    )
}