
import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import SalesChart from 'src/views/dashboard/SalesChart'
import PaymentsChart from 'src/views/dashboard/PaymentsChart'
import { getCookie } from 'cookies-next';


const Summary = () => {

  const [value, setValue] = useState([
    dayjs('2022-04-17'),
    dayjs('2022-04-21'),
  ]);


  useEffect(() => {
    const fetchData = async () => {
    };

    fetchData();
  }, []);


  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>

        <Grid item xs={12} md={6} lg={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker localeText={{ start: 'Start Date', end: 'End Date' }} value={value} onChange={(newValue) => setValue(newValue)} />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
        </Grid>
        <br></br>

        <Grid item xs={12} md={6} lg={6}>
          <SalesChart />
        </Grid>


        <Grid item xs={12} md={6} lg={6}>
          <PaymentsChart></PaymentsChart>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <PaymentsChart></PaymentsChart>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <PaymentsChart></PaymentsChart>
        </Grid>


      </Grid>
    </ApexChartWrapper>
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

export default Summary
