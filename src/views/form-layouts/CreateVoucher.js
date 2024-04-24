import { useState } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'

import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

const CreateVoucher = ({ handleCreate }) => {
  const [formData, setFormData] = useState({
    name: '',
    minimumAmount: 0,
    discountPercentage: 0,
    maximumDiscount: 0,
    quantity: 0,
    expiredDate: '',
    description: '',
    hotelId: null,
  });

  const handleChange = (prop) => (event) => {
    let value = event.target.value;
    if (['minimumAmount', 'maximumDiscount', 'quantity', 'discountPercentage'].includes(prop)) {
      value = value.trim() !== '' ? parseFloat(value) : '';
    }
    setFormData({ ...formData, [prop]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    handleCreate(formData);
  };


  return (
    <Card>
      <CardHeader title='New Voucher' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Name'
                placeholder='Voucher'
                required
                value={formData.name}
                onChange={handleChange('name')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type='minimumAmount'
                label='Minimum Amount'
                placeholder='0'
                value={formData.minimumAmount}
                onChange={handleChange('minimumAmount')}
                type='number'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label='Discount Percentage'
                placeholder='0'
                value={formData.discountPercentage}
                onChange={handleChange('discountPercentage')}
                type='number'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label='Maximum Discount'
                placeholder='100'
                value={formData.maximumDiscount}
                onChange={handleChange('maximumDiscount')}
                type='number'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type='quantity'
                label='Quantity'
                placeholder='0'
                value={formData.quantity}
                onChange={handleChange('quantity')}
                type='number'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                type='expiredDate'
                label='ExpiredDate'
                placeholder='2024-04-30'
                value={formData.expiredDate}
                onChange={handleChange('expiredDate')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type='description'
                label='Description'
                placeholder='0'
                value={formData.description}
                onChange={handleChange('description')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type='hotelId'
                label='HotelId'
                placeholder='0'
                value={formData.hotelId}
                onChange={handleChange('hotelId')}
              />
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  gap: 5,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'flex-end'
                }}
              >
                <Button type='submit' variant='contained' size='large' onClick={handleSubmit}>
                  Save
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default CreateVoucher
