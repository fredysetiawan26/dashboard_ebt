import { Button, Stack } from '@mui/material';
import React from 'react';
import { API_URL_DOWNLOAD } from '../utils/URL';

export default function DownloadPage() {
    return (
        <Stack margin={2} direction="row">
            <Button
                variant='contained'
                size='large'
                href={API_URL_DOWNLOAD}>
                Go To Download Page
            </Button>
        </Stack>
    );
}


