import { format } from 'date-fns';

import { Button, Paper, Table, TableRow, TableHead, TableBody, TableCell, TableContainer, CardHeader, Card, Chip } from '@mui/material';

const VoucherTable = ({ vouchers, onDelete }) => {
  const handleDelete = (userId, newStatus) => {
    onDelete(userId, newStatus);
  };
  if (!vouchers || vouchers.length === 0) {
    return (
      <Card>
        <CardHeader title='No voucher' titleTypographyProps={{ variant: 'h6' }} />
      </Card>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align='right'>Minimum Amount</TableCell>
            <TableCell align='right'>Discount Percentage</TableCell>
            <TableCell align='right'>Maximum Discount</TableCell>
            <TableCell align='right'>Quantity</TableCell>
            <TableCell align='right'>ExpiredDate</TableCell>
            <TableCell align='right'>Description</TableCell>
            <TableCell align='right'>HotelId</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vouchers.map(row => (
            <TableRow
              key={row.id}
              sx={{
                '&:last-of-type td, &:last-of-type th': {
                  border: 0
                }
              }}
            >
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell align='right'>{row.minimumAmount}</TableCell>
              <TableCell align='right'>{row.discountPercentage}</TableCell>
              <TableCell align='right'>{row.maximumDiscount}</TableCell>
              <TableCell align='right'>{row.quantity}</TableCell>
              <TableCell align='right'>{format(new Date(row.expiredDate), 'dd/MM/yyyy HH:mm:ss')}</TableCell>
              <TableCell align='right'>{row.description}</TableCell>
              <TableCell align='right'>{row.hotelId ? row.hotelId : 'All'}</TableCell>
              <TableCell align='right'>
                <Button
                  variant='outlined'
                  color={'primary'}
                  onClick={() =>
                    handleDelete(row.id)
                  }
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default VoucherTable;
