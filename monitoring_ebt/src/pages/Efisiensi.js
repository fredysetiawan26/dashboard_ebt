import React from 'react'
import { Helmet } from 'react-helmet-async'
import EfisiensiInputOutputMatahari from './EfisiensiInputOutputMatahari'

export default function Efisiensi() {
    return (
        <>
            <Helmet>
                <title> Monitoring Energi Dashboard | DTNTF FT UGM </title>
            </Helmet>
            <EfisiensiInputOutputMatahari />
        </>
    )
}
