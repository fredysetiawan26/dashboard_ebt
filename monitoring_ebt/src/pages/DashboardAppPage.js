import { Helmet } from 'react-helmet-async';
import Potensi from './Potensi';
import SuryaAC from './SuryaAC';
import SuryaDC from './SuryaDC';
import Turbin from './Turbin';

export default function DashboardAppPage() {
  return (
    <>
      <Helmet>
        <title> Monitoring Energi Dashboard | DTNTF FT UGM </title>
      </Helmet>
      <Potensi />
      <SuryaAC />
      <SuryaDC />
      <Turbin />
    </>
  )
}
