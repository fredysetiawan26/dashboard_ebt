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
import { API_URL_TAHUNAN, } from '../utils/URL';
import { useState } from 'react';
import { LIST_KILO, LIST_POWER } from '../utils/DataList';
import RealTimeGrafik from './RealTimeGrafik';


export default function DataTahunan() {
  // DATA BULAN
  const [tahun, setTahun] = React.useState(null);

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

  //DATA BULAN DAN TAHUN
  const dataTahun = new Date(tahun).getFullYear()
  var listBulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"]

  // console.log(
  // "panjang data:", dataLength,
  // "data value:", GetAxios().then(),
  // "data tanggal", bulan,
  // "data bulan", dataBulan,
  // "data tahun", dataTahun,
  // "data all:", dataAll,
  // "data waktu terakhir:", dataWaktu,
  // "coba:",dataWaktu2-dataWaktu1,
  // )

  //JIKA BELUM ADA INPUT
  function GetDataTahun() {
    if (client_id !== '' && tahun !== null) {
      axios
        .get(API_URL_TAHUNAN + client_id + '?tahun=' + dataTahun)
        .then(res => {
          const dataValue = res.data.value.sort((a, b) => parseInt(a.bulan_ke) - parseInt(b.bulan_ke))

          if (dataValue.length !== 0) {
            const dataLength = dataValue.length

            for (let i = 0; i < dataLength; i++) {
              let rawBulan = dataValue[i].bulan_ke
              let raw = listBulan[rawBulan - 1]
              db_created_at_1.push(raw)
            }

            for (let i = 0; i < dataLength; i++) {
              let raw = dataValue[i].value.sum_bulanan_daya
              power_1.push(raw);
            }

            for (let i = 0; i < dataLength; i++) {
              let raw = dataValue[i].value.sum_bulanan_energi
              energy_1.push(raw);
            }

            set_db_created_at((prev) => db_created_at_1);
            setPower((prev) => power_1);
            setEnergy((prev) => energy_1);

          }
          else if (dataValue.length === 0) {
            alert("Data tidak ditemukan.")
          }
        })
        .catch(error => {
          console.log("error ya", error);
        });
    }
    else if (client_id === '' || tahun == null) {
      alert("Data tidak valid.")
    }
  }

  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h6" color={'black'} sx={{ mt: 0, mb: 2 }}>
          Data Monitoring Tahunan
        </Typography>

        <Grid container spacing={0.5}>

          <Grid item xs={3} md={12} lg={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                inputFormat="YYYY"
                label="Masukan Data Tahun"
                views={['year']}
                value={tahun}
                onChange={(newValue) => {
                  setTahun(newValue);
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
                  GetDataTahun()
                }}
              >Dapatkan Data</Button>
            </Stack>
          </Grid>

          <Grid item xs={12} md={12} lg={12} marginTop={1} marginBottom={5} >
            <RealTimeGrafik
              title="Energi yang dihasilkan"
              columnWidth='20%'
              chartLabels={LIST_POWER(db_created_at)}
              chartData={[
                // {
                //   name: 'Daya (kW)',
                //   type: 'column',
                //   fill: 'solid',
                //   data: LIST_KILO(power)
                // },
                {
                  name: 'Energy (kWh)',
                  type: 'column',
                  fill: 'solid',
                  data: LIST_KILO(energy)
                },
              ]}
            />
          </Grid>

        </Grid>

      </Container>
    </>
  )
}
