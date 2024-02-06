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
import { LocationEntry, } from '@/_types';
import { useEffect, useState } from 'react';
import { LocationEntryInfo } from "./add-new";
import { Contract } from '@/_types/index2';


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
  const [itemDetail, setItemDetail] = useState<Contract>()

  console.log(visibleRows)
  console.log('----')

  useEffect(() => {
    setVisibleRows(items.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    ))
  }, [page, rowsPerPage, items])

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
                <TableCell>Data adquirida</TableCell>
                <TableCell>Tipo de contracto</TableCell>
                <TableCell>Valor pago</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Corretor</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((item: Contract) => {
                const isSelected = selected.includes(item.id);
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
                        <Avatar src={'/images/pin.png'} sx={{ width: 20, height: 20, backgroundColor: '#00B1B2', padding: 1}} >
                          {item.id}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {item.startDate}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                        <Typography  variant="subtitle2"> { item.typeContract == 'Alugar' ? 'Aluguel': 'Venda' }</Typography>
                    </TableCell>
                    <TableCell>
                      {item.totalPaid} KZ
                    </TableCell>
                    <TableCell>
                      {item.client.firstName + ' ' + item.client.lastName }
                    </TableCell>
                    <TableCell>
                      { item.broker.firstName + ' ' + item.broker.lastName}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => {
                          setItemDetail(item)
                          setOpen(true)
                      }} size="small" >
                        <Typography>Ver contracto</Typography>
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
      <LocationEntryInfo open={open} setOpen={setOpen} item={itemDetail} edit />
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