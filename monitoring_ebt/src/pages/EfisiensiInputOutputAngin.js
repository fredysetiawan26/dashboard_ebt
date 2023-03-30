import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import axios from 'axios';
import { API_URL_TURBIN, API_URL_POTENSI_ANGIN } from '../utils/URL';
import { useState } from 'react';
import { fShortenCommaNumber } from '../utils/formatNumber';
import { fDateTime } from '../utils/formatTime';
import RealTimeGrafik from './RealTimeGrafik';
import { LIST_EFISIENSI, LIST_POWER, LIST_TIMEHOUR } from '../utils/DataList';
import WidgetBox from './WidgetBox';
import { useEffect } from 'react';

export default function EfisiensiInputOutputAngin() {
    useTheme();

    const [sensorDataAngin, setSensorDataAngin] = useState([])
    const [sensorDataAnemo, setSensorDataAnemo] = useState([])

    useEffect(() => {
        if (!sensorDataAngin.length) {
            (async () => {
                const res = await axios.get(API_URL_TURBIN)
                const dataValueAngin = res.data.value.sort((a, b) => new Date(a.db_created_at) - new Date(b.db_created_at))
                setSensorDataAngin(dataValueAngin)
            })()
        }

        setInterval(() => {
            (async () => {
                const res = await axios.get(API_URL_TURBIN)
                const dataValueAngin = res.data.value.sort((a, b) => new Date(a.db_created_at) - new Date(b.db_created_at))
                setSensorDataAngin(dataValueAngin)
            })()
        }, 60 * 1000)
    }, []);

    useEffect(() => {
        if (!sensorDataAnemo.length) {
            (async () => {
                const raw = await axios.get(API_URL_POTENSI_ANGIN)
                const dataValueAnemo = raw.data.data.values.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                setSensorDataAnemo(dataValueAnemo)
            })()
        }

        setInterval(() => {
            (async () => {
                const raw = await axios.get(API_URL_POTENSI_ANGIN)
                const dataValueAnemo = raw.data.data.values.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                setSensorDataAnemo(dataValueAnemo)
            })()
        }, 2.5 * 60 * 1000)
    }, []);

    // useEffect(() => {
    //     if (!sensorDataAngin.length || !sensorDataAnemo) {
    //         (async () => {
    //             const res = await axios.get(API_URL_SURYA_AC)
    //             const raw = await axios.get(API_URL_POTENSI_IRADIASI)
    //             const dataValueSuryaAC = res.data.value.sort((a, b) => new Date(a.db_created_at) - new Date(b.db_created_at))
    //             const dataValueSPM = raw.data.data.values.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    //             setSensorDataSuryaAC(dataValueSuryaAC)
    //             setSensorDataSPM(dataValueSPM)
    //         })()
    //     }

    //     setInterval(() => {
    //         (async () => {
    //             const res = await axios.get(API_URL_SURYA_AC)
    //             const raw = await axios.get(API_URL_POTENSI_IRADIASI)
    //             const dataValueSuryaAC = res.data.value.sort((a, b) => new Date(a.db_created_at) - new Date(b.db_created_at))
    //             const dataValueSPM = raw.data.data.values.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    //             setSensorDataSuryaAC(dataValueSuryaAC)
    //             setSensorDataSPM(dataValueSPM)
    //         })()
    //     }, 60 * 1000)
    // }, []);

    const currentDataAngin = sensorDataAngin[4]
    const currentDataAnemo = sensorDataAnemo[0]
    const db_created_at = [sensorDataAngin[0]?.db_created_at, sensorDataAngin[1]?.db_created_at, sensorDataAngin[2]?.db_created_at, sensorDataAngin[3]?.db_created_at, sensorDataAngin[4]?.db_created_at]
    const wind_created_at = [sensorDataAnemo[24]?.created_at, sensorDataAnemo[18]?.created_at, sensorDataAnemo[12]?.created_at, sensorDataAnemo[6]?.created_at, sensorDataAnemo[0]?.created_at]
    const power = [sensorDataAngin[0]?.power, sensorDataAngin[1]?.power, sensorDataAngin[2]?.power, sensorDataAngin[3]?.power, sensorDataAngin[4]?.power]
    const wind_power = [sensorDataAnemo[24]?.value, sensorDataAnemo[18]?.value, sensorDataAnemo[12]?.value, sensorDataAnemo[6]?.value, sensorDataAnemo[0]?.value]

    return (
        <>
            <Container maxWidth="xl">
                <Typography variant="h6" color={'black'} sx={{ mt: 0, mb: 2 }}>
                    Data Monitoring Efisiensi Input Output Daya Turbin Angin
                </Typography>

                <Grid container spacing={3}>

                    <Grid item xs={12} sm={6} md={2}>
                        <WidgetBox sx={{ py: 2 }} title="Efisiensi (%)" number={fShortenCommaNumber(LIST_EFISIENSI(power, wind_power)[4])} color="success" />
                    </Grid>

                    <Grid item xs={12} sm={6} md={5}>
                        <WidgetBox sx={{ py: 2 }} title="Kecepatan angin terakhir diperbaharui" waktu={fDateTime(currentDataAnemo?.created_at)} color="error" />
                    </Grid>

                    <Grid item xs={12} sm={6} md={5}>
                        <WidgetBox sx={{ py: 2 }} title="Daya output terakhir diperbaharui" waktu={fDateTime(currentDataAngin?.db_created_at)} color="primary" />
                    </Grid>

                    <Grid item xs={12} md={12} lg={6} marginBottom={5} >
                        <RealTimeGrafik
                            title="Kecepatan angin potensi"
                            columnWidth='50%'
                            chartLabels={LIST_TIMEHOUR(wind_created_at)}

                            chartData={[
                                {
                                    name: 'Kecepatan angin (m/s)',
                                    type: 'area',
                                    fill: 'gradient',
                                    data: LIST_POWER(wind_power)
                                },
                            ]}
                        />
                    </Grid>

                    <Grid item xs={12} md={12} lg={6} marginBottom={5} >
                        <RealTimeGrafik
                            title="Daya output turbin"
                            columnWidth='50%'
                            chartLabels={LIST_TIMEHOUR(db_created_at)}
                            chartData={[
                                {
                                    name: 'Daya output (W)',
                                    type: 'area',
                                    fill: 'gradient',
                                    data: LIST_POWER(power)
                                },
                            ]}
                        />
                    </Grid>

                    <Grid item xs={12} md={12} lg={12} marginBottom={5} >
                        <RealTimeGrafik
                            title="Rasio output dan input"
                            columnWidth='50%'
                            chartLabels={LIST_TIMEHOUR(db_created_at)}
                            chartData={[
                                {
                                    name: 'Efisiensi daya (%)',
                                    type: 'line',
                                    fill: 'solid',
                                    data: LIST_EFISIENSI(power, wind_power)
                                },
                            ]}
                        />
                    </Grid>

                </Grid>

            </Container>
        </>
    )
}
