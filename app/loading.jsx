import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {
    return 
    (
        <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row" className="flex items-center justify-center h-[70vh] w-full bg-black">
            <CircularProgress color="secondary" />
            <CircularProgress color="success" />
            <CircularProgress color="inherit" />
        </Stack>
    )
  }

