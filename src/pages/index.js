
import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import HotelIcon from '@mui/icons-material/Hotel';
import AccountOutline from 'mdi-material-ui/AccountOutline'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import Trophy from 'src/views/dashboard/Trophy'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/SalesChart'
import { getCookie } from 'cookies-next';

const Dashboard = () => {
  const [totalHotel, setToTalHotel] = useState(0);
  const [totalUser, setToTalUser] = useState(0);
  const [totalBooking, setToTalBooking] = useState(0);
  const [totalSale, setToTalSale] = useState(0);
  const [totalSaleThisMonth, setToTalSaleThisMonth] = useState(0);
  const [totalUserThisMonth, setToTalUserThisMonth] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalHotel = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/total-hotels`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        const totalUser = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/total-users`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        const totalBooking = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/total-bookings`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        const totalSale = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/total-sales`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })

        const totalHotelJson = await totalHotel.json();
        if (totalHotelJson) {
          setToTalHotel(totalHotelJson)
        }
        const totalUserJson = await totalUser.json();
        if (totalUserJson) {
          setToTalUser(totalUserJson.totalUsersOverall)
          setToTalUserThisMonth(totalUserJson.totalUsersThisMonth)
        }
        const totalBookingJson = await totalBooking.json();
        if (totalBookingJson) {
          setToTalBooking(totalBookingJson)
        }
        const totalSaleJson = await totalSale.json();
        if (totalSaleJson) {
          setToTalSale(totalSaleJson.totalSalesOverall);
          setToTalSaleThisMonth(totalSaleJson.totalSalesThisMonth)
        }
      } catch (error) {
        console.error('Login failed', error)
      }
    };

    fetchData();
  }, []);


  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6} lg={6}>
          <CardStatisticsVerticalComponent
            stats={'$' + totalSale}
            color='warning'
            trend='negative'
            //trendNumber='-18%'
            subtitle='Total'
            title='Total Sales'
            icon={<CurrencyUsd />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <CardStatisticsVerticalComponent
            stats={totalUser}
            icon={<AccountOutline />}
            color='success'
            //trendNumber='+42%'
            title='Total Customer'
            subtitle='Total'
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <CardStatisticsVerticalComponent
            stats={totalHotel}
            title='Total Hotel'
            trend='negative'
            color='secondary'
            //trendNumber='Total Hotel'
            subtitle='Total'
            icon={<HotelIcon />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <CardStatisticsVerticalComponent
            stats={totalBooking}
            trend='negative'
            //trendNumber='-18%'
            title='Total Booking'
            subtitle='Total'
            icon={<AccountBalanceWalletIcon />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Trophy totalSaleThisMonth={totalSaleThisMonth} />
        </Grid>
        <Grid item xs={12} md={6}>
          <StatisticsCard totalUserThisMonth={totalUserThisMonth} totalSaleThisMonth={totalSaleThisMonth} />
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

export default Dashboard
