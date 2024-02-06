import { Grid, Stack, Typography } from "@mui/material";

export default function LabelInfo({title, subtitle}: {title: string, subtitle: string | boolean}){
    return(
        <Grid item xs={2}  >
            <Stack direction={'column'}  minWidth={'50%'} >
                    <Typography sx={{color: '#5F5F5F', fontSize: '12px', fontWeight: '400'}} >{title}</Typography>
                    <Typography sx={{ color: '#5B5B5B', fontWeight: '500' }} >{  typeof subtitle != 'boolean' ? subtitle : (subtitle ? 'Active': 'Not active') }  </Typography>
            </Stack>
        </Grid>
    )
}

/**
 * 
 * <FormControl  onChange={() => disable ? setDisable(!disable): null} sx={{width: '60%', alignItems: 'flex-start',}}  component="form" onSubmit={handleSubmit}>
 * 
 * <Stack direction={'column'}>
                            <Typography sx={{color: '#5F5F5F', fontSize: '12px', fontWeight: '400'}} >Roaming: </Typography>
                            <Stack direction={'row'} alignContent={'center'} alignItems={'center'} >
                                <Typography sx={{ color: '#5B5B5B', fontWeight: '500' }} >PostPaid: </Typography>
                                <Switch  />
                            </Stack>
                            <Stack direction={'row'} alignItems={'center'}>
                                <Typography sx={{ color: '#5B5B5B', fontWeight: '500' }} >Prepaid: </Typography>
                                <Switch  />
                            </Stack>
                        </Stack>
                    {
                      edit && <Box mb={3} >
                      <Typography color={'#6F7D97'} fontSize={12} >Id</Typography>
                      <TextField
                          value={cardInfo?.Id}
                          placeholder='e.g.:'
                          variant="outlined" size='small' sx={{marginTop: 0.2, width: '270px', color: '#6F7D97', fontSize: '18px' }} 
                          id="Id"
                          name="Id"
                          type="number"
                          required
                          InputProps={{
                              startAdornment: (
                              <InputAdornment position="start">
                                  <KeyIcon fontSize='small' />
                              </InputAdornment>
                              ),
                              readOnly: true,
                          }}
                      />
                  </Box>
                    }
                    <Box mb={3} >
                        <Typography color={'#6F7D97'} fontSize={12} >Key</Typography>
                        <TextField
                            defaultValue={edit ? cardInfo?.Key: undefined}
                            placeholder='e.g.: Voice, Data'
                            variant="outlined" size='small' sx={{marginTop: 0.2, width: '270px', color: '#6F7D97', fontSize: '18px' }} 
                            id="key"
                            name="key"
                            type="tel"
                            required
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <KeyIcon fontSize='small' />
                                </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

                    <Box mb={3}>
                        <Typography color={'#6F7D97'} fontSize={12} >Description</Typography>
                        <TextField
                            defaultValue={edit ? cardInfo?.Description: undefined}
                            placeholder='e.g.: Mobile data'
                            variant="outlined" size='small' sx={{marginTop: 0.2, width: '270px', color: '#6F7D97', fontSize: '18px' }} 
                            id="description"
                            name="description"
                            type="tel"
                            required
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <DescriptionIcon fontSize='small' />
                                </InputAdornment>
                                ),
                            }}
                            multiline
                            rows={4}
                        />
                    </Box>
                   
                    <LoadingButton
                        disabled={disable}
                        loading={loading}
                        type="submit"
                        color={'primary'}
                        size="small"
                        loadingPosition="center"
                        variant="contained"
                        sx={{width: '377px', borderRadius: 2, fontWeight: '550', fontSize: '16px', textTransform: 'none', mt: 1  }}
                    >{edit ? 'Save changes': 'Add'}
                    </LoadingButton>
                </FormControl>
 */