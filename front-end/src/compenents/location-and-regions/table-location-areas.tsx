import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import {  LocationArea, } from '@/_types';
import { useEffect, useState } from 'react';
import { LocationAreaInfo } from './add-new1';
import { Immobile } from '@/_types/index2';


export const CustomersTable = (props: any) => {
  const {
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 10,
    selected = []
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  const [visibleRows, setVisibleRows] = useState(items)
  const [open, setOpen] = useState(false);
  const [locationAre, setLocationAre] = useState<Immobile>()

  useEffect(() => {
    setVisibleRows(items.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    ))
  }, [page, rowsPerPage, items])

  const handleShowLocationDetail = (locationArea: LocationArea) => {
    
  }

  return (
    <>
  <Card>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        console.log('elect all ****')
                        onSelectAll?.();
                      } else {
                        console.log('deselect ****')
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Tipo de imovel</TableCell>
                <TableCell>Preço</TableCell>
                <TableCell>Disponivel</TableCell>
                <TableCell>Tipo de negocio</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((item: Immobile) => {
                const isSelected = selected.includes(item.id);
                const createdAt = item.id
                return (
                  <TableRow
                    hover
                    key={item.id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(item.id);
                          } else {
                            onDeselectOne?.(item.id);
                          }
                        }}
                      />
                    </TableCell>
                    {/** onClick={() => router.push('/accounts/578578787')} */}
                    <TableCell >
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Avatar src={'/images/home.png'} sx={{ width: 20, height: 20, backgroundColor: '#00B1B2', padding: 1}} >
                          {item.id}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {item.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                        <Typography color={'white'} bgcolor={ item.type == 'COMERCIAL' ?  '#32a852': '#883199' } variant="subtitle2">{item.type}</Typography>
                    </TableCell>
                    <TableCell>
                      {item.price}
                    </TableCell>
                    <TableCell>
                      {item.isAvailable ? 'SIM': 'NAO' }
                    </TableCell>
                    <TableCell>
                      { item.typePropertyBusiness }
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => {
                          setLocationAre(item)
                          setOpen(true)
                      }} size="small" >
                        <ArrowRightAltIcon fontWeight={'500'} fontSize="medium" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      <TablePagination
        component="div"
        count={items.length}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
      <LocationAreaInfo open={open} setOpen={setOpen} item={locationAre} edit />
    </>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};