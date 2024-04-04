import { useEffect } from 'react'

import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

import TableBasic from 'src/views/tables/TableBasic'
import TableDense from 'src/views/tables/TableDense'
import TableSpanning from 'src/views/tables/TableSpanning'
import TableCustomized from 'src/views/tables/TableCustomized'
import TableCollapsible from 'src/views/tables/TableCollapsible'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'

const MUITable = () => {

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.SERVER_URL}/admin/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: values.email, password: values.password })
        })
        console.log(response);
        response.status = true;
        if (true) {
          setCookie('login', 'true');
          router.push('/')
        } else {
          console.error('Login failed')
        }
      } catch (error) {
        console.error('Login failed', error)
      }
    };

    fetchData();
  }, []);

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
          <Link href='https://mui.com/components/tables/' target='_blank'>
            User
          </Link>
        </Typography>
        <Typography variant='body2'>Tables display sets of data</Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='User Table' titleTypographyProps={{ variant: 'h6' }} />
          <TableBasic />
        </Card>
      </Grid>
    </Grid>
  )
}

export default MUITable
