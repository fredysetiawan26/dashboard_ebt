import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import {
    GrafikSimple,
} from '../sections/@dashboard/app';
import axios from 'axios';
import { API_URL_POTENSI } from '../utils/URL';
import { useState } from 'react';
import { fShortenCommaNumber } from '../utils/formatNumber';
import { fDateTime } from '../utils/formatTime';
import WidgetBox from './WidgetBox';

export default function Potensi() {
    useTheme();
    //AMBIL DATA DARI API
    const [sun_created_at, set_sun_created_at] = useState([]);
    var sun_created_at_1 = [];
    const [anemo_created_at, set_anemo_created_at] = useState([]);
    var anemo_created_at_1 = [];
    const [sun_power, setSunPower] = useState([]);
    var sun_power_1 = [];
    const [windspeed, setWindSpeed] = useState([]);
    var windspeed_1 = [];

    axios
        .get(API_URL_POTENSI)
        .then(res => {
            const spm = res.data.data.sensors[0].values.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
            const anemo = res.data.data.sensors[4].values.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))

            // if (dataValue[4].db_created_at != db_created_at[4]) {
            for (let i = 0; i < spm.length; i++) {
                let raw = new Date(spm[i].created_at).toLocaleString()
                sun_created_at_1.push(fDateTime(raw))
            }
            for (let i = 0; i < spm.length; i++) {
                let raw = spm[i].value
                sun_power_1.push(raw)
            }
            for (let i = 0; i < anemo.length; i++) {
                let raw = new Date(anemo[i].created_at).toLocaleString()
                anemo_created_at_1.push(raw);
            }
            for (let i = 0; i < anemo.length; i++) {
                let raw = anemo[i].value
                windspeed_1.push(raw);
            }

            // console.log(
            //     "Waktu:", sun_created_at,
            // "Tegangan: ", voltage,
            // "Arus:", current,
            // "Daya:", power,
            // "Energy:", energy,
            // "Power Factor:", power_factor
            // "data:", spm
            // );

            set_sun_created_at((prev) => sun_created_at_1);
            set_anemo_created_at((prev) => anemo_created_at_1);
            setSunPower((prev) => sun_power_1);
            setWindSpeed((prev) => windspeed_1);

        })
        .catch(error => {
            console.log("error ya", error);
        });

    return (
        <>
            <Container maxWidth="xl">
                <Typography variant="h6" color={'black'} sx={{ mt: 0, mb: 2 }}>
                    Data Monitoring Potensi
                </Typography>

                <Grid marginBottom={5} container spacing={3}>

                    <Grid item xs={12} sm={6} md={3}>
                        <WidgetBox title="Iradiasi Matahari (W/m2)" number={fShortenCommaNumber(sun_power[4])} color="warning" />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <WidgetBox title="Kecepatan Angin (m/s)" number={fShortenCommaNumber(windspeed[4])} color="error" />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        <WidgetBox title="Terakhir diperbaharui" waktu={fDateTime(anemo_created_at[4])} color="primary" />
                    </Grid>


                    <Grid item xs={12} md={6} lg={6}>
                        <GrafikSimple
                            title="Potensi Iradiasi Matahari (W/m2)"
                            chartLabels={[sun_created_at[0], sun_created_at[1], sun_created_at[2], sun_created_at[3], sun_created_at[4]]}
                            chartData={[
                                {
                                    name: 'Iradiasi Matahari (W/m2)',
                                    type: 'area',
                                    fill: 'gradient',
                                    data: [(sun_power[0]), (sun_power[1]), (sun_power[2]), (sun_power[3]), (sun_power[4])],
                                },
                            ]}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={6}>
                        <GrafikSimple
                            title="Kecepatan Angin (m/s)"
                            chartLabels={[anemo_created_at[0], anemo_created_at[1], anemo_created_at[2], anemo_created_at[3], anemo_created_at[4]]}
                            chartData={[
                                {
                                    name: 'Daya (W)',
                                    type: 'area',
                                    fill: 'gradient',
                                    data: [(windspeed[0]), (windspeed[1]), (windspeed[2]), (windspeed[3]), (windspeed[4])],
                                },
                            ]}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
