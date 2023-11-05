import { NextRequest, NextResponse } from "next/server";
import { calculateRiptideData } from "./calculations";

const WINDY_API_LINK = 'https://api.windy.com/api/point-forecast/v2';

export async function GET(req: NextRequest, res: NextResponse) {
    const url = new URL(req.url!);

    const queryParams = new URLSearchParams(url.search);

    const lat = queryParams.get('lat');
    const long = queryParams.get('long');

    // Check if lat and lon are provided and are valid numbers
    if (typeof lat !== 'string' || typeof long !== 'string' || isNaN(Number(lat)) || isNaN(Number(long))) {
        return NextResponse.json({ error: 'Invalid or missing latitude or longitude query parameters' });
    }

    const windResponse = await fetch(WINDY_API_LINK, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "lat": Number(lat),
            "lon": Number(long),
            "model": "gfs",
            "parameters": ["temp", "precip", "windGust", "cape", "wind"],
            "levels": ["surface"],
            "key": 'I3xCjSuzffTbAQIucnsitNjy6b3E76O6'
        }),
    });

    const waveResponse = await fetch(WINDY_API_LINK, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "lat": Number(lat),
            "lon": Number(long),
            "model": "gfsWave",
            "parameters": ["waves"],
            "levels": ["surface"],
            "key": 'I3xCjSuzffTbAQIucnsitNjy6b3E76O6'
        }),
    });

    const windData = await windResponse.json();
    const waveData = await waveResponse.json();
    const data = {
        ...windData,
        ...waveData,
    };

    const riptideData = calculateRiptideData(data);
    console.log(riptideData)
    return NextResponse.json({ riptideData });
}
