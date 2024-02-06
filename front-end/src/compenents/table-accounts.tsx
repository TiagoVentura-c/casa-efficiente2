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
import { useRouter } from 'next/navigation';
import { BundleApi } from '@/_types';
import { getIconBasedOnServiceType } from '@/services/bundles';
import { useEffect, useState } from 'react';

export const CustomersTable = (props: any) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);
  const router = useRouter()

  const [visibleRows, setVisibleRows] = useState(items)

  useEffect(() => {
    setVisibleRows(items.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    ))
  }, [page, rowsPerPage, items])

  return (
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
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  Nome
                </TableCell>
                <TableCell>
                  Tipo de imovel
                </TableCell>
                <TableCell>
                  Preco
                </TableCell>
                <TableCell>
                  Estado
                </TableCell>
                <TableCell>
                  Para
                </TableCell>
                <TableCell>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((item: BundleApi) => {
                const isSelected = selected.includes(item.Key);
                const createdAt = item.Status

                return (
                  <TableRow
                    hover
                    key={item.Key}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(item.Key);
                          } else {
                            onDeselectOne?.(item.Key);
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
                        <Avatar src={getIconBasedOnServiceType(item.ServiceType)} sx={{ width: 20, height: 20, backgroundColor: '#00B1B2', padding: 1}} >
                          {item.Name_Lang1}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {item.Name_Lang1}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {item.ServiceType}
                    </TableCell>
                    <TableCell>
                      {item.Validity_Type}
                    </TableCell>
                    <TableCell>
                      {item.Price}
                    </TableCell>
                    <TableCell>
                      {createdAt}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => router.push(`/bundles/${item.Key}`)} size="small" >
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
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
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