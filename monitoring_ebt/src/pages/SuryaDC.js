import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import {
    GrafikSimple,
} from '../sections/@dashboard/app';
import axios from 'axios';
import { API_URL_SURYA_DC } from '../utils/URL';
import { useState } from 'react';
import { fShortenCommaNumber } from '../utils/formatNumber';
import { fDateTime } from '../utils/formatTime';
import WidgetBox from './WidgetBox';

export default function SuryaDC() {
    useTheme();
    //AMBIL DATA DARI API
    const [db_created_at, set_db_created_at] = useState([]);
    var db_created_at_1 = [];
    const [voltage, setVoltage] = useState([]);
    var voltage_1 = [];
    const [current, setCurrent] = useState([]);
    var current_1 = [];
    const [power, setPower] = useState([]);
    var power_1 = [];
    const [energy, setEnergy] = useState([]);
    var energy_1 = [];
    const [power_factor, setPowerFactor] = useState([]);
    var power_factor_1 = [];
    axios
        .get(API_URL_SURYA_DC)
        .then(res => {
            const dataValue = res.data.value.sort((a, b) => new Date(a.db_created_at) - new Date(b.db_created_at))
            // if (res.data.value[4].db_created_at != db_created_at[4]) {
            for (let i = 0; i < dataValue.length; i++) {
                let raw = dataValue[i].db_created_at
                db_created_at_1.push(raw)
            }
            for (let i = 0; i < dataValue.length; i++) {
                let raw = dataValue[i].voltage
                voltage_1.push(raw)
            }
            for (let i = 0; i < dataValue.length; i++) {
                let raw = dataValue[i].current
                current_1.push(raw);
            }
            for (let i = 0; i < dataValue.length; i++) {
                let raw = dataValue[i].power
                power_1.push(raw);
            }
            for (let i = 0; i < dataValue.length; i++) {
                let raw = dataValue[i].energy
                energy_1.push(raw);
            }
            for (let i = 0; i < dataValue.length; i++) {
                let raw = dataValue[i].power_factor
                power_factor_1.push(raw);
            }
            // console.log(
            //     "Waktu:", db_created_at,
            //     "Tegangan: ", voltage,
            //     "Arus:", current,
            //     "Daya:", power,
            //     "Energy:", energy,
            //     "Power Factor:", power_factor
            // );
            set_db_created_at((prev) => db_created_at_1);
            setVoltage((prev) => voltage_1);
            setCurrent((prev) => current_1);
            setPower((prev) => power_1);
            setEnergy((prev) => energy_1);
            setPowerFactor((prev) => power_factor_1);
            // }
        })
        .catch(error => {
            console.log("error ya", error);
        });

    return (
        <>
            <Container maxWidth="xl">
                <Typography variant="h6" color={'black'} sx={{ mt: 5, mb: 2 }}>
                    Data Monitoring PLTS On Grid (DC)
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <WidgetBox title="Tegangan (V)" number={fShortenCommaNumber(voltage[4])} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <WidgetBox title="Arus (A)" number={fShortenCommaNumber(current[4])} color="success" />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <WidgetBox title="Daya (W)" number={fShortenCommaNumber(power[4])} color="warning" />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <WidgetBox title="Energi (Wh)" number={fShortenCommaNumber(energy[4])} color="error" />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <WidgetBox title="Faktor Daya" number={fShortenCommaNumber(power_factor[4])} color="info" />
                    </Grid>

                    <Grid item xs={12} sm={6} md={9}>
                        <WidgetBox title="Terakhir diperbaharui" waktu={fDateTime(db_created_at[4])} color="primary" />
                    </Grid>

                    <Grid item xs={12} md={6} lg={6}>
                        <GrafikSimple
                            title="Energi dihasilkan (Wh)"
                            chartLabels={[db_created_at[0], db_created_at[1], db_created_at[2], db_created_at[3], db_created_at[4]]} chartData={[
                                {
                                    name: 'Energi (Wh)',
                                    type: 'column',
                                    fill: 'gradient',
                                    data: [(energy[0]), (energy[1]), (energy[2]), (energy[3]), (energy[4])],
                                },
                            ]}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={6}>
                        <GrafikSimple
                            title="Daya dihasilkan (W)"
                            chartLabels={[db_created_at[0], db_created_at[1], db_created_at[2], db_created_at[3], db_created_at[4]]}
                            chartData={[
                                {
                                    name: 'Daya (W)',
                                    type: 'area',
                                    fill: 'gradient',
                                    data: [(power[0]), (power[1]), (power[2]), (power[3]), (power[4])],
                                },
                            ]}
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
