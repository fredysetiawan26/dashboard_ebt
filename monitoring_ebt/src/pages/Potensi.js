import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import axios from 'axios';
import { API_URL_POTENSI } from '../utils/URL';
import { useState } from 'react';
import { fShortenCommaNumber } from '../utils/formatNumber';
import { fDateTime } from '../utils/formatTime';
import WidgetBox from './WidgetBox';
import { useEffect } from 'react';
import RealTimeGrafik from './RealTimeGrafik';
import { LIST_POWER, LIST_TIMEHOUR } from '../utils/DataList';

export default function Potensi() {
    useTheme();

    const [sensorDataSPM, setSensorDataSPM] = useState([])
    const [sensorDataAnemo, setSensorDataAnemo] = useState([])

    useEffect(() => {
        if (!sensorDataSPM.length || !sensorDataAnemo.length) {
            (async () => {
                const res = await axios.get(API_URL_POTENSI)
                const dataValueSPM = res.data.data.sensors[0].values.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
                const dataValueAnemo = res.data.data.sensors[4].values.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))

                setSensorDataSPM(dataValueSPM)
                setSensorDataAnemo(dataValueAnemo)
            })()
        }

        setInterval(() => {
            (async () => {
                const res = await axios.get(API_URL_POTENSI)
                const dataValueSPM = res.data.data.sensors[0].values.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
                const dataValueAnemo = res.data.data.sensors[4].values.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))

                setSensorDataSPM(dataValueSPM)
                setSensorDataAnemo(dataValueAnemo)
            })()
        }, 60 * 1000)
    }, []);

    const currentDataSPM = sensorDataSPM[4];
    const currentDataAnemo = sensorDataAnemo[4];
    const sun_created_at = [sensorDataSPM[0]?.created_at,sensorDataSPM[1]?.created_at,sensorDataSPM[2]?.created_at,sensorDataSPM[3]?.created_at,sensorDataSPM[4]?.created_at]
    const anemo_created_at = [sensorDataAnemo[0]?.created_at,sensorDataAnemo[1]?.created_at,sensorDataAnemo[2]?.created_at,sensorDataAnemo[3]?.created_at,sensorDataAnemo[4]?.created_at]
    const sun_power = [sensorDataSPM[0]?.value,sensorDataSPM[1]?.value,sensorDataSPM[2]?.value,sensorDataSPM[3]?.value,sensorDataSPM[4]?.value]
    const wind_speed = [sensorDataAnemo[0]?.value,sensorDataAnemo[1]?.value,sensorDataAnemo[2]?.value,sensorDataAnemo[3]?.value,sensorDataAnemo[4]?.value]

    return (
        <>
            <Container maxWidth="xl">
                <Typography variant="h6" color={'black'} sx={{ mt: 0, mb: 2 }}>
                    Data Monitoring Potensi
                </Typography>

                <Grid marginBottom={5} container spacing={3}>

                    <Grid item xs={12} sm={6} md={6}>
                        <WidgetBox title="Iradiasi Matahari (W/m2)" number={fShortenCommaNumber(currentDataSPM?.value)} color="warning" />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        <WidgetBox title="Kecepatan Angin (m/s)" number={fShortenCommaNumber(currentDataAnemo?.value)} color="error" />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        <WidgetBox title="Terakhir iradiasi matahari diperbaharui" waktu={fDateTime(currentDataSPM?.created_at)} color="primary" />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        <WidgetBox title="Terakhir kecepatan angin diperbaharui" waktu={fDateTime(currentDataAnemo?.created_at)} color="success" />
                    </Grid>


                    <Grid item xs={12} md={6} lg={6}>
                        <RealTimeGrafik
                            title="Potensi Iradiasi Matahari (W/m2)"
                            chartLabels={LIST_TIMEHOUR(sun_created_at)}
                            chartData={[
                                {
                                    name: 'Iradiasi Matahari (W/m2)',
                                    type: 'area',
                                    fill: 'gradient',
                                    data: LIST_POWER(sun_power),
                                },
                            ]}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={6}>
                        <RealTimeGrafik
                            title="Kecepatan Angin (m/s)"
                            chartLabels={LIST_TIMEHOUR(anemo_created_at)}
                            chartData={[
                                {
                                    name: 'Kecepatan angin (m/s)',
                                    type: 'area',
                                    fill: 'gradient',
                                    data: LIST_POWER(wind_speed)
                                },
                            ]}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
