import { useState, useEffect } from 'react'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import VoucherTable from 'src/views/tables/VoucherTable'
import { getCookies, setCookie, deleteCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/router'

const Voucher = () => {
  const [vouchers, setVouchers] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vouchers`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${getCookie('accessToken')}`,
          },
        })
        const responseJson = await response.json();
        if (responseJson && responseJson.length > 0) {
          setVouchers(responseJson)
        } else {
          console.log('No data')
        }
      } catch (error) {
        console.error('No data', error)
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vouchers/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${getCookie('accessToken')}`,
        },
      })
      const updatedVouchers = vouchers.filter(voucher => voucher.id !== id);
      setVouchers(updatedVouchers);
      setOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddVoucher = () => {
    router.push('/voucher/add');
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value.toLowerCase());
  };

  const filteredVouchers = vouchers.filter((voucher) => {
    const searchTextLower = searchText.toLowerCase();
    return (
      voucher?.name?.toLowerCase().includes(searchTextLower) ||
      voucher?.description?.toLowerCase().includes(searchTextLower)
    );
  });

  return (
    <><Snackbar
      open={open}
      autoHideDuration={3000}
      message="Delete Success"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    /><Grid container spacing={6}>
        <Grid item xs={12}>
          <Typography variant='h5'>
            Voucher Manager
          </Typography>
        </Grid>
        <Grid item xs={12} container justifyContent="space-between" alignItems="center">

          <TextField
            label="Search Vouchers"
            value={searchText}
            onChange={handleSearchChange}
          />

          <Button variant="contained" onClick={handleAddVoucher}>Add Voucher</Button>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Approve' titleTypographyProps={{ variant: 'h6' }} />
            <VoucherTable vouchers={filteredVouchers} onDelete={handleDelete} />
          </Card>
        </Grid>
      </Grid></>
  )
}

export const getServerSideProps = ({ req, res }) => {
  const cookies = getCookie('login', { req, res });
  if (!cookies) {
    return {
      redirect: {
        destination: "/pages/login",
        permanent: false,
      },
    };
  }

  return { props: {} };
};

export default Voucher
