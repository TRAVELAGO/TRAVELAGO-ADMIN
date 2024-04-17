
import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import SalesChart from 'src/views/dashboard/SalesChart'
import BookingChart from 'src/views/dashboard/BookingChart'
import HotelChart from 'src/views/dashboard/HotelChart'
import UserChart from 'src/views/dashboard/UserChart';
import { getCookie } from 'cookies-next';


const Summary = () => {

  const [value, setValue] = useState([
    dayjs().subtract(14, 'day'),
    dayjs(new Date()),
  ]);

  const [userData, setUserData] = useState([
    {
      "date": "No data",
      "count": 0
    }
  ]);
  const [saleData, setSaleData] = useState([
    {
      "date": "No data",
      "totalAmount": 10
    }
  ]);
  const [bookingData, setBookingData] = useState([
    {
      "date": "No data",
      "count": 0
    }
  ]);
  const [hotelData, setHotelData] = useState([
    {
      "date": "No data",
      "count": 0
    }
  ]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users-summary?startDate=${value[0].format('YYYY-MM-DD')}&endDate=${value[1].format('YYYY-MM-DD')}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        const userJson = await user.json();
        if (userJson && userJson.length>0 ) {
          setUserData(userJson)
        }

        const sale = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/sales-summary?startDate=${value[0].format('YYYY-MM-DD')}&endDate=${value[1].format('YYYY-MM-DD')}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        const saleJson = await sale.json();
        if (saleJson && saleJson.length >0) {
          setSaleData(saleJson)
        }

        const booking = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/bookings-summary?startDate=${value[0].format('YYYY-MM-DD')}&endDate=${value[1].format('YYYY-MM-DD')}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        const bookingJson = await booking.json();
        if (bookingJson && bookingJson.length > 0) {
          setBookingData(bookingJson)
        }

        const hotel = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/hotels-summary?startDate=${value[0].format('YYYY-MM-DD')}&endDate=${value[1].format('YYYY-MM-DD')}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        const hotelJson = await hotel.json();
        if (hotelJson && hotelJson.length >0) {
          setHotelData(hotelJson)
        }


      } catch (error) {
        console.error('Login failed', error)
      }
    };

    fetchData();
  }, [value]);


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
          <SalesChart saleData={saleData} />
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <UserChart userData={userData}></UserChart>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <BookingChart bookingData={bookingData}></BookingChart>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <HotelChart hotelData={hotelData}></HotelChart>
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
