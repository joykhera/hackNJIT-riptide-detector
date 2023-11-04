import { NextResponse } from "next/server";
import beaches from './beaches.json';

interface DataPoint {
    t: string;
    v: number; // Assuming after parsing, 'v' will always be a number
}

interface Beaches {
    [key: string]: string;
}

const beachesTyped: Beaches = beaches;

const NOAA_API_LINK = 'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter';

const apiOptions = {
    date: 'today',
    format: 'json',
    product: 'one_minute_water_level',
    units: 'english',
    time_zone: 'lst_ldt',
    datum: 'STND',
    station: beachesTyped['San Francisco, CA']
}

function calculateRateOfChange(data: DataPoint[]): number[] {
    // Convert string values to numbers for calculation
    data.forEach((point: DataPoint) => {
        // Ensure 'v' is treated as a string here, even though it's a union type
        if (typeof point.v === 'string') {
            point.v = parseFloat(point.v);
        }
    });

    // Calculate the absolute change in water level between each minute
    const changes = data.map((point, index, array) => {
        if (index === 0) return 0; // No change at the first data point
        // Since we've already converted all 'v' values to numbers, this subtraction should be fine
        return Math.abs(point.v - array[index - 1].v);
    });

    // Remove the first element (0) as it's not a change
    changes.shift();

    return changes;
}


// Function to estimate the probability of rip currents
function estimateRipCurrentProbability(changes: number[]): number {
    // Define a threshold for significant change
    const significantChangeThreshold = 0.02; // Example threshold

    // Count how many changes are above the threshold
    const significantChanges = changes.filter(change => change > significantChangeThreshold).length;

    // Calculate the probability as the ratio of significant changes to total changes
    const probability = significantChanges / changes.length;

    return probability;
}

// To handle a GET request to /api
export async function GET(request: Request): Promise<NextResponse> {
    const queryParams = new URLSearchParams(apiOptions as any).toString();
    const apiUrl = `${NOAA_API_LINK}?${queryParams}`;
    // console.log(apiUrl);
    const response = await fetch(apiUrl);
    const responseData = await response.json();
    // console.log(responseData);

    // Assuming responseData.data is an array of DataPoint
    // You would need to validate this and handle any discrepancies
    const changes = calculateRateOfChange(responseData.data as DataPoint[]);

    // Estimate the probability of a rip current
    const probability = estimateRipCurrentProbability(changes);
    // console.log(probability);

    return NextResponse.json({ probability });
}
