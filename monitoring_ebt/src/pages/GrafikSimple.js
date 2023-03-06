import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Card, CardHeader, Box } from '@mui/material';
// components
import { useChart } from '../components/chart';
import { fTimeHour } from '../utils/formatTime';
import { fShortenCommaNumber } from '../utils/formatNumber';

// ----------------------------------------------------------------------

GrafikSimple.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
  chartLabels: PropTypes.array.isRequired,
};

export default function GrafikSimple({ title, subheader, chartLabels, chartData, ...other }) {
  const chartOptions = useChart({
    plotOptions: { bar: { columnWidth: '50%' } },
    fill: { type: chartData.map((i) => i.fill) },
    labels: chartLabels,
    yaxis: {
      decimalsInFloat: 0,
    },
    xaxis: {  
      categories: [
        fTimeHour(chartLabels[0]), fTimeHour(chartLabels[1]), fTimeHour(chartLabels[2]), fTimeHour(chartLabels[3]), fTimeHour(chartLabels[4])
      ]
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${fShortenCommaNumber(y)}`;
          }
          return y;
        },
      },
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 1, pb: 0 }} dir="ltr">
        <ReactApexChart type="line" series={chartData} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
