"use client"
import React, {  useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import { CustomersTable } from "./table-location-entries";
import MDSearch from "@/compenents/search";
import AddNew from "./add-new";
import { useSnackbar } from "notistack";
import { Contract } from "@/_types/index2";
import { ServiceGetServiceContracts } from "@/services/property";
import { useFetchApprovedContract } from "@/queries/contract";

export default function Contracts(){
  const { enqueueSnackbar } = useSnackbar();
  const { data }  = useFetchApprovedContract()
  const [rows, setRows] = useState<Contract[] | undefined>(data)

  useEffect(() => {
    setRows(data)
  }, [data])

  const [selected, setSelected] = useState<number[]>([])
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const onDeselectAll = () => {
    setSelected([])
  }

  const onDeselectOne = (item: any) => {
    setSelected(selected.filter(s => s!=item))
  }

  const onSelectAll = () => {
    setSelected(rows?.map(d => d.id!) as number[])
  }

  const onSelectOne = (newItem: string) => {
    setSelected([...selected, parseInt(newItem)])
  }

  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleDelete = async () => {
    try {
      // await ServiceDeleteLocationEntry(selected)
      enqueueSnackbar('Location entries deleted successull!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Failed to execute operation ' + error, { variant: 'error' });
    }
  }

    const handleSearch = (event: any) => {

    }
  
    return(
        <Box sx={{ flexGrow: 1, }}>
            <Stack direction={'row'} mb={2} >
              <Stack direction={'row'} flex={1} alignItems={'flex-end'} >
                <Typography sx={{ fontWeight: '400', fontSize: '17px', }} >{rows?.length} Contractos</Typography> <span> </span> 
                { selected?.length > 0 && <Typography sx={{ fontWeight: '400', fontSize: '14px', }} >, {selected?.length} selecionado</Typography>}
              </Stack>
                <Stack direction="row" spacing={2}>
                  <Button onClick={() => {alert('In development')}} variant="outlined" startIcon={<FileDownloadOutlinedIcon />}>
                    Export
                  </Button>
                  <AddNew />
                  <Button disabled={!(selected.length > 0)} onClick={handleDelete} variant="outlined" startIcon={<DeleteOutline />}>
                    Delete
                  </Button>
                  <MDSearch onChange={handleSearch} />
                </Stack>
            </Stack>
            <CustomersTable
              count={rows?.length}
              items={rows}
              onDeselectAll={onDeselectAll}
              onDeselectOne={onDeselectOne}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              onSelectAll={onSelectAll}
              onSelectOne={onSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={selected}
            />
        </Box>
    )
}