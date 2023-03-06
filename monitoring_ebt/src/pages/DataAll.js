import React from 'react'
import { Helmet } from 'react-helmet-async';
import DataBulanan from './DataBulanan';
import DataHarian from './DataHarian'
import DataTahunan from './DataTahunan';

export default function DataAll() {
    return (
        <>
            <Helmet>
                <title> Monitoring Energi Dashboard | DTNTF FT UGM </title>
            </Helmet>
            <DataHarian />
            <DataBulanan />
            <DataTahunan />
        </>
    )
}
