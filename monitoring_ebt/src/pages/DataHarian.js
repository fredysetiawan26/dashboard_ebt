import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Grid, Container, Stack, Button, Typography } from '@mui/material';
import axios from 'axios';
import { API_URL_HARIAN } from '../utils/URL';
import { useState } from 'react';
import { fDateConversion, fTimeHour } from '../utils/formatTime';
import { LIST_POWER } from '../utils/DataList';
import RealTimeGrafik from './RealTimeGrafik';


export default function DataHarian() {
  // DATA TANGGAL
  const [harian, setHarian] = React.useState(null);

  //DATA CLIENT_ID
  const [client_id, setClientId] = React.useState('');
  const handleChange = (event) => {
    setClientId(event.target.value);
  };

  //AMBIL DATA DARI API
  var [db_created_at, set_db_created_at] = React.useState([]);
  var db_created_at_1 = [];
  const [power, setPower] = useState([]);
  var power_1 = [];
  const [energy, setEnergy] = useState([]);
  var energy_1 = [];

  //JIKA BELUM ADA INPUT
  function GetDataHari() {
    if (client_id !== '' && harian !== null) {
      axios
        .get(API_URL_HARIAN + 'data=' + client_id + '&waktu=' + fDateConversion(harian))
        .then(res => {
          const dataValue = res.data.value.sort((a, b) => new Date(a.db_created_at) - new Date(b.db_created_at))

          // console.log(
          // "panjang data:", dataLength,
          // "data value:", dataValue,
          // "data all:", dataAll,
          // "data waktu terakhir:", dataWaktu,
          // "coba:",dataWaktu2-dataWaktu1,
          // )

          if (dataValue.length !== 0) {
            const dataLength = dataValue.length

            for (let i = 0; i < dataLength; i++) {
              let raw = fTimeHour(dataValue[i].db_created_at)
              db_created_at_1.push(raw)
            }

            for (let i = 0; i < dataLength; i++) {
              let raw = dataValue[i].value.power
              power_1.push(raw);
            }

            for (let i = 0; i < dataLength; i++) {
              let raw = dataValue[i].value.energy
              energy_1.push(raw);
            }

            // console.log(
            // "Waktu terakhir:", db_created_at[dataLength - 1],
            // "Tegangan: ", voltage,
            // "Arus:", current,
            // "Daya:", power[dataLength - 1],
            // "Energy:", energy,
            // "Power Factor:", power_factor
            // );

            set_db_created_at((prev) => db_created_at_1);
            setPower((prev) => power_1);
            setEnergy((prev) => energy_1);
            // }
          }
          else if (dataValue.length === 0) {
            alert("Data tidak ditemukan.")
          }
        }
        )
        .catch(error => {
          console.log("error ya", error);
        });
    } else if (client_id === '' || harian == null) {
      alert("Data tidak valid.")
    }
  }

  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h6" color={'black'} sx={{ mt: 0, mb: 2 }}>
          Data Monitoring Harian
        </Typography>

        <Grid container spacing={0.5}>

          <Grid item xs={3} md={12} lg={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                inputFormat="DD/MM/YYYY"
                label="Masukan Data Hari"
                value={harian}
                onChange={(newValue) => {
                  setHarian(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} />
                )}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={3} md={12} lg={3}>
            <FormControl sx={{ mt: 0, ml: 0, mr: 0, minWidth: 115 }}>
              <InputLabel id="client_id">Client_id</InputLabel>
              <Select
                labelId="client_id"
                id="client_id"
                value={client_id}
                label="Client_id"
                onChange={handleChange}
                autoWidth
              >
                <MenuItem value="">
                  <em>-</em>
                </MenuItem>
                <MenuItem value={"suryaAC"}>SuryaAC</MenuItem>
                <MenuItem value={"suryaDC"}>SuryaDC</MenuItem>
                <MenuItem value={"turbin"}>Turbin</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} md={12} lg={6}>
            <Stack mt={0.25} spacing={2} direction="column">
              <Button size='large' variant='contained' disableElevation
                onClick={() => {
                  GetDataHari()
                }}
              >Dapatkan Data</Button>
            </Stack>
          </Grid>

          <Grid item xs={12} md={12} lg={12} marginTop={1} marginBottom={5} >
            <RealTimeGrafik
              title="Daya yang dihasilkan"
              columnWidth='50%'
              chartLabels={LIST_POWER(db_created_at)}
              chartData={[
                {
                  name: 'Daya (W)',
                  type: 'area',
                  fill: 'solid',
                  data: LIST_POWER(power)
                },
                // {
                //   name: 'Energi (Wh)',
                //   type: 'area',
                //   fill: 'solid',
                //   data: LIST_POWER(energy)
                // },
              ]}
            />
          </Grid>

        </Grid>

      </Container>
    </>
  )
}
