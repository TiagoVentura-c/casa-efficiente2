import { Box, Button, Stack, Typography } from "@mui/material";
import useFetchBundle from "@/queries/bundles";

import { CustomersTable } from "../table-accounts";
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from "next/navigation";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import React, { useEffect,  useState } from "react";
import MDSearch from "../search";
import { ServiceDeleteBundlesList } from "@/services/bundles";
import { BundleApi } from "@/_types";
import { useSnackbar } from "notistack";
  

export default function Accounts(){
  const { enqueueSnackbar } = useSnackbar();

  const { data }  = useFetchBundle()
  const [rows, setRows] = useState<BundleApi[] | undefined>(data)

  const [selected, setSelected] = useState<string[]>([])
  
  useEffect(() => {
    setRows(data)
  }, [data])


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
    setSelected(data?.map(d => d.Key) as string[])
  }

  const onSelectOne = (newItem: string) => {
    setSelected([...selected, newItem])
  }

  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleDelete = async () => {
    try {
      await ServiceDeleteBundlesList(selected)
      enqueueSnackbar('Bundles deleted successull!', { variant: 'success' });
    } catch (error) {
      alert(error)
      enqueueSnackbar('Failed to delete bundle ' + error, { variant: 'error' });
    }
  }

  const handleSearch = (event: any) => {
    // Filtrar o array com base no termo fornecido
    const sentence = event.target.value.toLowerCase()
    const result = data?.filter((row: BundleApi) => {
        return sentence === ""
          ? data
          : row.Key.toString().toLowerCase().includes(sentence) ||
          row.Id.toString().toLowerCase().includes(sentence) ||
          row.Name_Lang1.toString().toLowerCase().includes(sentence) ||
          row.Name_Lang2.toString().toLowerCase().includes(sentence) ||
          row.Name_Lang3.toString().toLowerCase().includes(sentence) ||
          row.Description_Lang1.toString().toLowerCase().includes(sentence) ||
          row.Description_Lang3.toString().toLowerCase().includes(sentence) ||
          row.Description_Lang3.toString().toLowerCase().includes(sentence) ||
          row.ServiceType.toString().toLowerCase().includes(sentence) ||
          row.Validity_Type.toString().toLowerCase().includes(sentence) ||
          row.Price.toString().toLowerCase().includes(sentence)
      })

    setRows(result)
    return result
  }
  
  const router = useRouter()
  
    return(
        <Box sx={{ flexGrow: 1, }}>
            <Stack direction={'row'} mb={2} >
              <Stack direction={'row'} flex={1} alignItems={'flex-end'} >
                  <Typography sx={{ fontWeight: '400', fontSize: '17px', }} >{rows?.length} Imoveis disponiveis</Typography> <span> </span> 
                  { selected?.length > 0 && <Typography sx={{ fontWeight: '400', fontSize: '14px', }} >, {selected?.length} Imoveis selecionados</Typography>}
              </Stack>
                <Stack direction="row" spacing={2}>
                  <Button onClick={() => router.push('/bundles/add-bundle')} variant="outlined" startIcon={<AddIcon />}>
                    Add
                  </Button>
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