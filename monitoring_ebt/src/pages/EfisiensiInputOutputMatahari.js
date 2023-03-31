import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import axios from 'axios';
import { API_URL_SURYA_AC, API_URL_POTENSI_IRADIASI } from '../utils/URL';
import { useState } from 'react';
import { fShortenCommaNumber } from '../utils/formatNumber';
import { fDateTime } from '../utils/formatTime';
import RealTimeGrafik from './RealTimeGrafik';
import { LIST_DayaPerLuasan, LIST_EFISIENSI, LIST_POTENSI_SURYA, LIST_POWER, LIST_TIMEHOUR } from '../utils/DataList';
import WidgetBox from './WidgetBox';
import { useEffect } from 'react';

export default function EfisiensiInputOutputMatahari() {
    useTheme();

    const [sensorDataSuryaAC, setSensorDataSuryaAC] = useState([])
    // const [sensorDataSuryaDC, setSensorDataSuryaDC] = useState([])
    const [sensorDataSPM, setSensorDataSPM] = useState([])

    useEffect(() => {
        if (!sensorDataSuryaAC.length) {
            (async () => {
                const res = await axios.get(API_URL_SURYA_AC)
                // const has = await axios.get(API_URL_SURYA_DC)
                const dataValueSuryaAC = res.data.value.sort((a, b) => new Date(a.db_created_at) - new Date(b.db_created_at))
                // const dataValueSuryaDC = res.data.value.sort((a, b) => new Date(a.db_created_at) - new Date(b.db_created_at))
                setSensorDataSuryaAC(dataValueSuryaAC)
                // setSensorDataSuryaDC(dataValueSuryaDC)
            })()
        }

        setInterval(() => {
            (async () => {
                const res = await axios.get(API_URL_SURYA_AC)
                // const has = await axios.get(API_URL_SURYA_DC)
                const dataValueSuryaAC = res.data.value.sort((a, b) => new Date(a.db_created_at) - new Date(b.db_created_at))
                // const dataValueSuryaDC = res.data.value.sort((a, b) => new Date(a.db_created_at) - new Date(b.db_created_at))
                setSensorDataSuryaAC(dataValueSuryaAC)
                // setSensorDataSuryaDC(dataValueSuryaDC)
            })()
        }, 60 * 1000)
    }, []);

    useEffect(() => {
        if (!sensorDataSPM.length) {
            (async () => {
                const raw = await axios.get(API_URL_POTENSI_IRADIASI)
                const dataValueSPM = raw.data.data.values.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                setSensorDataSPM(dataValueSPM)
            })()
        }

        setInterval(() => {
            (async () => {
                const raw = await axios.get(API_URL_POTENSI_IRADIASI)
                const dataValueSPM = raw.data.data.values.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                setSensorDataSPM(dataValueSPM)
            })()
        }, 2.5 * 60 * 1000)
    }, []);

    // useEffect(() => {
    //     if (!sensorDataSuryaAC.length || !sensorDataSPM) {
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

    const currentDataSuryaAC = sensorDataSuryaAC[4]
    const currentDataSPM = sensorDataSPM[0]
    const db_created_at = [sensorDataSuryaAC[0]?.db_created_at, sensorDataSuryaAC[1]?.db_created_at, sensorDataSuryaAC[2]?.db_created_at, sensorDataSuryaAC[3]?.db_created_at, sensorDataSuryaAC[4]?.db_created_at]
    const sun_created_at = [sensorDataSPM[24]?.created_at, sensorDataSPM[18]?.created_at, sensorDataSPM[12]?.created_at, sensorDataSPM[6]?.created_at, sensorDataSPM[0]?.created_at]
    const power = [sensorDataSuryaAC[0]?.power, sensorDataSuryaAC[1]?.power, sensorDataSuryaAC[2]?.power, sensorDataSuryaAC[3]?.power, sensorDataSuryaAC[4]?.power]
    const sun_power = [sensorDataSPM[24]?.value, sensorDataSPM[18]?.value, sensorDataSPM[12]?.value, sensorDataSPM[6]?.value, sensorDataSPM[0]?.value]

    return (
        <>
            <Container maxWidth="xl">
                <Typography variant="h6" color={'black'} sx={{ mt: 0, mb: 2 }}>
                    Data Monitoring Efisiensi Input Output Daya PV
                </Typography>

                <Grid container spacing={3}>

                    <Grid item xs={12} sm={6} md={2}>
                        <WidgetBox sx={{ py: 2 }} title="Efisiensi (%)" number={fShortenCommaNumber(LIST_EFISIENSI(power, LIST_DayaPerLuasan(LIST_POTENSI_SURYA(sun_power)))[4])} color="success" />
                    </Grid>

                    <Grid item xs={12} sm={6} md={5}>
                        <WidgetBox sx={{ py: 2 }} title="Daya input terakhir diperbaharui" waktu={fDateTime(currentDataSPM?.created_at)} color="error" />
                    </Grid>

                    <Grid item xs={12} sm={6} md={5}>
                        <WidgetBox sx={{ py: 2 }} title="Daya output terakhir diperbaharui" waktu={fDateTime(currentDataSuryaAC?.db_created_at)} color="primary" />
                    </Grid>

                    <Grid item xs={12} md={12} lg={6} marginBottom={5} >
                        <RealTimeGrafik
                            title="Daya input PV"
                            columnWidth='50%'
                            chartLabels={LIST_TIMEHOUR(sun_created_at)}

                            chartData={[
                                {
                                    name: 'Daya input (W)',
                                    type: 'area',
                                    fill: 'gradient',
                                    data: LIST_DayaPerLuasan(LIST_POTENSI_SURYA(sun_power))
                                },
                            ]}
                        />
                    </Grid>

                    <Grid item xs={12} md={12} lg={6} marginBottom={5} >
                        <RealTimeGrafik
                            title="Daya output PV"
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
                            title="Rasio daya output dan input"
                            columnWidth='50%'
                            chartLabels={LIST_TIMEHOUR(db_created_at)}
                            chartData={[
                                {
                                    name: 'Efisiensi daya (%)',
                                    type: 'area',
                                    fill: 'gradient',
                                    data: LIST_EFISIENSI(power, LIST_DayaPerLuasan(LIST_POTENSI_SURYA(sun_power)))
                                },
                            ]}
                        />
                    </Grid>

                </Grid>

            </Container>
        </>
    )
}
