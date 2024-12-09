import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Container, Paper, Typography } from '@mui/material'

const Table = ({ rows, columns, heading, rowHeight = 52 }) => {
    return (
        <Container
            sx={{
                height: '100vh'
            }}>

            <Paper
                elevation={3}
                sx={{
                    padding: '1rem 4rem',
                    borderRadius: '1rem',
                    margin: 'auto',
                    width: '100%',
                    overflow: 'hidden',
                    height: '100%',
                    boxShadow: 'none',
                    bgcolor: 'transparent',
                    color: 'white',
                    // bgcolor: 'red'
                }}
            >
                {/* Heading  (All Users) */}
                <Typography
                    textAlign={'center'}
                    variant='h4'
                    sx={{
                        margin: '2rem',
                        textTransform: 'uppercase',
                        // bgcolor: 'transparent',
                        // color: 'white'
                        // color: 'black'

                    }}
                >
                    {heading}
                </Typography>

                <DataGrid
                    rows={rows}
                    columns={columns}
                    rowHeight={rowHeight}
                    style={{
                        height: '80%',
                        background: '#777'
                    }}
                    sx={{
                        // border: '1px solid red',
                        border: 'none',
                        '.table-header': {
                            bgcolor: '#333',
                            color: 'white'

                        },
                        '.MuiDataGrid-cell': {
                            bgcolor: '#777',  // Cell background color
                            color: 'white',  // Cell text color
                        },

                    }}
                />
            </Paper>
        </Container>
    )
}

export default Table
