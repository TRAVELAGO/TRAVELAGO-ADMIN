import { Button, Paper, Table, TableRow, TableHead, TableBody, TableCell, TableContainer, CardHeader, Card } from '@mui/material';

const ApproveTable = ({ users, onStatusChange }) => {
  const handleStatusChange = (userId, newStatus) => {
    onStatusChange(userId, newStatus);
  };
  if (!users || users.length === 0) {
    return (
      <Card>
        <CardHeader title='No accounts for approval' titleTypographyProps={{ variant: 'h6' }} />
      </Card>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell align='right'>Name</TableCell>
            <TableCell align='right'>Phone</TableCell>
            <TableCell align='right'>Role</TableCell>
            <TableCell align='right'>Address</TableCell>
            <TableCell align='right'>Status</TableCell>
            <TableCell align='right'>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(row => (
            <TableRow
              key={row.id}
              sx={{
                '&:last-of-type td, &:last-of-type th': {
                  border: 0
                }
              }}
            >
              <TableCell component='th' scope='row'>
                {row.email}
              </TableCell>
              <TableCell align='right'>{row.fullName}</TableCell>
              <TableCell align='right'>{row.phoneNumber}</TableCell>
              <TableCell align='right'>{row.role}</TableCell>
              <TableCell align='right'>{row.address}</TableCell>
              <TableCell align='right'>{row.status}</TableCell>
              <TableCell align='right'>
                <Button
                  variant='outlined'
                  color={row.status === 1 ? 'secondary' : 'primary'}
                  onClick={() =>
                    handleStatusChange(row.id, row.status === 1 ? 0 : 1)
                  }
                >
                  Approve
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ApproveTable;
