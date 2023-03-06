import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import axios from 'axios';
import { API_URL_SURYA_AC, API_URL_POTENSI_IRADIASI } from '../utils/URL';
import { useState } from 'react';
import { fShortenCommaNumber } from '../utils/formatNumber';
import { fDateTime } from '../utils/formatTime';
import RealTimeGrafik from './RealTimeGrafik';
import { LIST_DayaPerLuasan, LIST_EFISIENSI, LIST_POWER, LIST_TIMEHOUR } from '../utils/DataList';
import WidgetBox from './WidgetBox';


export default function EfisiensiInputOutputMatahari() {
    useTheme();
    //AMBIL DATA DARI API OUTPUT DAYA PV
    const [db_created_at, set_db_created_at] = useState([]);
    var db_created_at_1 = [];
    const [power, setPower] = useState([]);
    var power_1 = [];
    //AMBIL DATA DARI API INPUT DAYA IRADIASI MATAHARI
    const [sun_created_at, set_sun_created_at] = useState([]);
    var sun_created_at_1 = [];
    var sun_created_at_5 = [sun_created_at[24], sun_created_at[18], sun_created_at[12], sun_created_at[6], sun_created_at[0]]
    const [sun_power, setSunPower] = useState([]);
    var sun_power_1 = [];
    var sun_power_5 = [sun_power[24], sun_power[18], sun_power[12], sun_power[6], sun_power[0]]

    axios
        .get(API_URL_SURYA_AC)
        .then(res => {
            const dataValue = res.data.value.sort((a, b) => new Date(a.db_created_at) - new Date(b.db_created_at))
            if (dataValue[4].db_created_at !== db_created_at[4]) {
                for (let i = 0; i < dataValue.length; i++) {
                    let raw = dataValue[i].db_created_at
                    db_created_at_1.push(raw)
                }
                for (let i = 0; i < dataValue.length; i++) {
                    let raw = dataValue[i].power
                    power_1.push(raw);
                }
                // console.log(
                //     "Waktu:", db_created_at,
                //     "Daya:", power,
                // );
                set_db_created_at((prev) => db_created_at_1);
                setPower((prev) => power_1);
            }
        })
        .catch(error => {
            console.log("error ya", error);
        });

    axios
        .get(API_URL_POTENSI_IRADIASI)
        .then(res => {
            const spm = res.data.data.values.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            const dataTanggal = new Date(spm[0].created_at).toLocaleString()
            if (fDateTime(dataTanggal) !== sun_created_at[0]) {
                for (let i = 0; i < spm.length; i++) {
                    let raw = new Date(spm[i].created_at).toLocaleString()
                    sun_created_at_1.push(fDateTime(raw))
                }
                for (let i = 0; i < spm.length; i++) {
                    let raw = spm[i].value
                    sun_power_1.push(raw)
                }
                // console.log(
                //     "Waktu:", fDateTime(new Date(spm[0].created_at).toLocaleString()),
                //     "data:", sun_created_at[0]
                // );
                set_sun_created_at((prev) => sun_created_at_1);
                setSunPower((prev) => sun_power_1);
            }
        })
        .catch(error => {
            console.log("error ya", error);
        });

    return (
        <>
            <Container maxWidth="xl">
                <Typography variant="h6" color={'black'} sx={{ mt: 0, mb: 2 }}>
                    Data Monitoring Efisiensi Input Output Daya PV
                </Typography>

                <Grid container spacing={3}>

                    <Grid item xs={12} sm={6} md={2}>
                        <WidgetBox  sx={{ py: 2 }} title="Efisiensi (%)" number={fShortenCommaNumber(LIST_EFISIENSI(power,sun_power_5)[4])} color="success" />
                    </Grid>

                    <Grid item xs={12} sm={6} md={5}>
                        <WidgetBox sx={{ py: 2 }} title="Daya input terakhir diperbaharui" waktu={fDateTime(sun_created_at_5[4])} color="error" />
                    </Grid>

                    <Grid item xs={12} sm={6} md={5}>
                        <WidgetBox sx={{ py: 2 }} title="Daya output terakhir diperbaharui" waktu={fDateTime(db_created_at[4])} color="primary" />
                    </Grid>

                    <Grid item xs={12} md={12} lg={6} marginBottom={5} >
                        <RealTimeGrafik
                            title="Daya input PV"
                            columnWidth='50%'
                            chartLabels={LIST_TIMEHOUR(sun_created_at_5)}

                            chartData={[
                                {
                                    name: 'Daya input (W)',
                                    type: 'area',
                                    fill: 'gradient',
                                    data: LIST_DayaPerLuasan(sun_power_5)
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
                                    type: 'line',
                                    fill: 'solid',
                                    data: LIST_EFISIENSI(power,sun_power_5)
                                },
                            ]}
                        />
                    </Grid>

                </Grid>

            </Container>
        </>
    )
}
