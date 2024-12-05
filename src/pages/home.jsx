import React from 'react'
import AppLayout from '../components/layout/AppLayout'
import { Box, Typography } from '@mui/material'
import { navyBlue } from '../constants/color'

const home = () => {
  return (
    <Box  sx={{ backdropFilter: 'blur(5px)',}} bgcolor={'rgba(0, 0, 0, 0.4)'} height={'100%'} color={'white'}>
      <Typography p={'2rem'} variant='h5' textAlign={'center'}>Select a Friend to Chat</Typography>
    </Box>
  )
}

export default AppLayout()(home)
