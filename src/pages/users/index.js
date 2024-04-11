import { useState, useEffect } from 'react'

import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import Snackbar from '@mui/material/Snackbar';

import UserTable from 'src/views/tables/UserTable'

const MUITable = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        const responseJson = await response.json();
        if (responseJson && responseJson.length > 0) {
          setUsers(responseJson)
        } else {
          console.error('Login failed')
        }
      } catch (error) {
        console.error('Login failed', error)
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = async (userId, newStatus) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users/${userId}/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      })
      const responseJson = await response.json();
      if (responseJson.status === 200) {
        const updatedUsers = users.map(user => {
          if (user.id === userId) {
            return { ...user, status: newStatus };
          }
          return user;
        });
        setUsers(updatedUsers);
        setOpen(true);
      } else {
        console.error('Cập nhật trạng thái không thành công.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <><Snackbar
      open={open}
      autoHideDuration={3000}
      message="Change Status Success"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    /><Grid container spacing={6}>
        <Grid item xs={12}>
          <Typography variant='h5'>
            <Link href='https://mui.com/components/users/' target='_blank'>
              User
            </Link>
          </Typography>
          <Typography variant='body2'>Tables display sets of data</Typography>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='User Table' titleTypographyProps={{ variant: 'h6' }} />
            <UserTable users={users} onStatusChange={handleStatusChange} />
          </Card>
        </Grid>
      </Grid></>
  )
}

export default MUITable
