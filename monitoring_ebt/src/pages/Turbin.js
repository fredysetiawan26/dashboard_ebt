import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import axios from 'axios';
import { API_URL_TURBIN } from '../utils/URL';
import { useState } from 'react';
import { fShortenCommaNumber } from '../utils/formatNumber';
import { fDateTime } from '../utils/formatTime';
import WidgetBox from './WidgetBox';
import { useEffect } from 'react';
import RealTimeGrafik from './RealTimeGrafik';
import { LIST_POWER, LIST_TIMEHOUR } from '../utils/DataList';

export default function Turbin() {
    useTheme();

    const [sensorData, setSensorData] = useState([])

    useEffect(() => {
        if (!sensorData.length) {
            (async () => {
                const res = await axios.get(API_URL_TURBIN)
                const dataValue = res.data.value.sort((a, b) => new Date(a.db_created_at) - new Date(b.db_created_at))
                setSensorData(dataValue)
            })()
        }

        setInterval(() => {
            (async () => {
                const res = await axios.get(API_URL_TURBIN)
                const dataValue = res.data.value.sort((a, b) => new Date(a.db_created_at) - new Date(b.db_created_at))
                setSensorData(dataValue)
            })()
        }, 60 * 1000)
    }, []);

    const currentData = sensorData[4];
    const db_created_at = [sensorData[0]?.db_created_at,sensorData[1]?.db_created_at,sensorData[2]?.db_created_at,sensorData[3]?.db_created_at,sensorData[4]?.db_created_at]
    const energy = [sensorData[0]?.energy,sensorData[1]?.energy,sensorData[2]?.energy,sensorData[3]?.energy,sensorData[4]?.energy]
    const power = [sensorData[0]?.power,sensorData[1]?.power,sensorData[2]?.power,sensorData[3]?.power,sensorData[4]?.power]
    
    return (
        <>
            <Container maxWidth="xl">
                <Typography variant="h6" color={'black'} sx={{ mt: 5, mb: 2 }}>
                    Data Monitoring PLTB Off Grid
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <WidgetBox title="Tegangan (V)" number={fShortenCommaNumber(currentData?.voltage)} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <WidgetBox title="Arus (A)" number={fShortenCommaNumber(currentData?.current)} color="success" />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <WidgetBox title="Daya (W)" number={fShortenCommaNumber(currentData?.power)} color="warning" />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <WidgetBox title="Energi (Wh)" number={fShortenCommaNumber(currentData?.energy)} color="error" />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <WidgetBox title="Faktor Daya" number={fShortenCommaNumber(currentData?.power_factor)} color="info" />
                    </Grid>

                    <Grid item xs={12} sm={6} md={9}>
                        <WidgetBox title="Terakhir diperbaharui" waktu={fDateTime(currentData?.db_created_at)} color="primary" />
                    </Grid>

                    <Grid item xs={12} md={6} lg={6}>
                        <RealTimeGrafik
                            title="Energi dihasilkan (Wh)"
                            columnWidth='50%'
                            chartLabels={LIST_TIMEHOUR(db_created_at)}
                            chartData={[
                            {
                                    name: 'Energi (Wh)',
                                    type: 'column',
                                    fill: 'gradient',
                                    data: LIST_POWER(energy),
                                },
                            ]}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={6}>
                        <RealTimeGrafik
                            title="Daya dihasilkan (W)"
                            columnWidth='50%'
                            chartLabels={LIST_TIMEHOUR(db_created_at)}
                            chartData={[
                                {
                                    name: 'Daya (W)',
                                    type: 'area',
                                    fill: 'gradient',
                                    data: LIST_POWER(power),
                                },
                            ]}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
