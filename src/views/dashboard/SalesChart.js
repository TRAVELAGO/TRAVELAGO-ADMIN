import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'

import DotsVertical from 'mdi-material-ui/DotsVertical'

import ReactApexcharts from 'src/@core/components/react-apexcharts'

const SalesChart = ({ saleData }) => {
  const options = {
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      categories: saleData.map(data => {
        if (data.date == 'No data') return 'No data';
        const dateObj = new Date(data.date);
        return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
      })
    }
  }

  return (
    <Card>
      <CardHeader
        title='Sales'
        titleTypographyProps={{
          sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
        }}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
      />

      <ReactApexcharts type='bar' options={options} series={[{ data: saleData.map(data => data.totalAmount) }]} />

    </Card>
  )
}

export default SalesChart
