import React from 'react'
import { Error as ErrorIcon } from '@mui/icons-material'
import { Box, Container, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <Box sx={{ bgcolor: 'rgba(0,0,0,0.9)' }}>
      <Container maxWidth='lg' sx={{ height: '100vh' }}>
        <Stack alignItems={'center'} spacing={'2rem'} justifyContent={'center'} height={'100%'}>
          <ErrorIcon sx={{ fontSize: '8rem', color: 'white' }} />
          <Typography variant='h3' color='white' fontWeight={'600'}>404</Typography>
          <Typography variant='h3' fontWeight={'600'} color='white'>Not Found</Typography>
          <Link to='/'>Go back to home</Link>
        </Stack>

      </Container>
    </Box>
  )
}

export default NotFound
