import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'

import DotsVertical from 'mdi-material-ui/DotsVertical'

import ReactApexcharts from 'src/@core/components/react-apexcharts'

const PaymentsChart = () => {

    const options = {
        chart: {
            id: "basic-bar"
        },
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
    }

    return (

        <Card>
            <CardHeader
                title='Total payments'
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
                series={[{ data: [37, 57, 45, 75, 57, 40, 65] }]}
                type="line"
            />
        </Card>

    )
}

export default PaymentsChart
