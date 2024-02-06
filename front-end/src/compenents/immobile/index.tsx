"use client"
import React, {  useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import MDSearch from "../search";
import { CustomersTable } from "./table-location-areas";
import { useSnackbar } from "notistack";
import AddNew from "./add-new1";
import { Immobile } from "@/_types/index2";
import useFetchImmobile from "@/queries/immobile";
import { ServiceDeleteImmobile } from "@/services/immbile";

export default function Immobiles(){
  const { data }  = useFetchImmobile()
  const [rows, setRows] = useState<Immobile[] | undefined>(data)

  const { enqueueSnackbar } = useSnackbar();

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
      await ServiceDeleteImmobile(selected)
      enqueueSnackbar('Imovel removido com sucesso', { variant: 'success' });
      location.reload()
    } catch (error) {
      enqueueSnackbar('Failed to execute operation ' + error, { variant: 'error' });
    }
  }

    const handleSearch = (event: any) => {
      // Filtrar o array com base no termo fornecido
      // const sentence = event.target.value.toLowerCase()
      // const result = data?.filter((row: LocationArea) => {
      //     return sentence === ""
      //       ? data
      //       : row.Key.toString().toLowerCase().includes(sentence) ||
      //       row.Description.toString().toLowerCase().includes(sentence) ||
      //       row.Id.toString().toLowerCase().includes(sentence) ||
      //       row.Municipality.toString().toLowerCase().includes(sentence) ||
      //       row.Provinces.toString().toLowerCase().includes(sentence) ||
      //       row.Type.toString().toLowerCase().includes(sentence)
      //   })

      // setRows(result)
      // return result
    }
  
    return(
        <Box sx={{ flexGrow: 1, }}>
            <Stack direction={'row'} mb={2} >
              <Stack direction={'row'} flex={1} alignItems={'flex-end'} >
                <Typography sx={{ fontWeight: '400', fontSize: '17px', }} >{rows?.length} Imoveis disponiveis</Typography> <span> </span> 
                { selected?.length > 0 && <Typography sx={{ fontWeight: '400', fontSize: '14px', }} >, {selected?.length} Imoveis selecionados</Typography>}
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