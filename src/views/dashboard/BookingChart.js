import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'

import DotsVertical from 'mdi-material-ui/DotsVertical'

import ReactApexcharts from 'src/@core/components/react-apexcharts'

const PaymentsChart = ({ bookingData }) => {
    const options = {
        chart: {
            id: "basic-bar"
        },
        xaxis: {
            categories: bookingData.map(data => {
                if (data.date == 'No data') return 'No data';
                const dateObj = new Date(data.date);
                return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
            })
        }
    }

    return (

        <Card>
            <CardHeader
                title='Bookings'
                titleTypographyProps={{
                    sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
                }}
                action={
                    <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
                        <DotsVertical />
                    </IconButton>
                }
            />
            <ReactApexcharts
                options={options}
                series={[{ data: bookingData.map(data => data.count) }]}
                type="area"
            />
        </Card>

    )
}

export default PaymentsChart
