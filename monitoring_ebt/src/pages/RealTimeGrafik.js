import React from 'react'
import ReactApexChart from 'react-apexcharts';
import { Card, CardHeader, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useChart } from '../components/chart';
import { fShortenCommaNumber } from '../utils/formatNumber';

RealTimeGrafik.propTypes = {
    title: PropTypes.string,
    chartData: PropTypes.array.isRequired,
    chartLabels: PropTypes.array.isRequired,
    columnWidth: PropTypes.string
};

export default function RealTimeGrafik({ title, chartData, chartLabels, columnWidth, ...other }) {
    const options = useChart({
        plotOptions: { bar: { columnWidth: columnWidth } },
        chart: {
            zoom: {
                toolbar: { show: true },
                enabled: false
            }
        },
        fill: { type: chartData.map((i) => i.fill) },
        labels: chartLabels,
        yaxis: {
            decimalsInFloat: 0,
        },
        xaxis: {
            tickAmount: 5,
            tickPlacement: 'on',
            type: 'category',
            categories: chartLabels,
            labels: {
                rotate: 0,
                rotateAlways: false,
            }
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
    const series = chartData

    return (
        <div>
            <Card {...other}>
                <CardHeader title={title} />
                <Box sx={{ p: 3, pb: 1 }} dir="ltr">
                    <ReactApexChart options={options} series={series} type="line" height={364} />
                </Box>
            </Card>
        </div>
    )
}
