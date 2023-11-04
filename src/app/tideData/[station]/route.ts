import { NextResponse } from "next/server";
import type { NextApiRequest, NextApiResponse } from 'next';
import { beaches } from '../beaches';

console.log('keyof typeof beaches;', )
type BeachNameType = keyof typeof beaches;

interface DataPoint {
    t: string;
    v: number; // Assuming after parsing, 'v' will always be a number
}


const NOAA_API_LINK = 'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter';

const apiOptions = {
    date: 'today',
    format: 'json',
    product: 'one_minute_water_level',
    units: 'english',
    time_zone: 'lst_ldt',
    datum: 'STND',
}

function calculateRateOfChange(data: DataPoint[]): number[] {
    data.forEach((point: DataPoint) => {
        if (typeof point.v === 'string') {
            point.v = parseFloat(point.v);
        }
    });


    const changes = data.map((point, index, array) => {
        if (index === 0) return 0;
        return Math.abs(point.v - array[index - 1].v);
    });

    changes.shift();

    return changes;
}


// Function to estimate the probability of rip currents
function estimateRipCurrentProbability(changes: number[]): number {
    const significantChangeThreshold = 0.02;
    const significantChanges = changes.filter(change => change > significantChangeThreshold).length;
    const probability = significantChanges / changes.length;
    return probability;
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const stationName = req.url!.split('/')[4] as BeachNameType;
    const queryParams = new URLSearchParams(apiOptions).toString();
    const station = beaches[stationName]
    const apiUrl = `${NOAA_API_LINK}?${queryParams}&station=${station}`;
    // console.log(apiUrl);
    const response = await fetch(apiUrl);
    const responseData = await response.json();
    // console.log(responseData);

    const changes = calculateRateOfChange(responseData.data as DataPoint[]);
    const probability = estimateRipCurrentProbability(changes);
    // console.log(probability);

    return NextResponse.json({ probability });
}