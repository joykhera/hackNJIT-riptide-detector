import { NextResponse } from "next/server";
import type { NextApiRequest, NextApiResponse } from 'next';
import { calculateRiptideData } from "../calculations";


const WINDY_API_LINK = 'https://api.windy.com/api/point-forecast/v2';


export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const response = await fetch(WINDY_API_LINK, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "lat": 49.809,
            "lon": 16.787,
            "model": "gfs",
            "parameters": ["temp", "precip", "windGust", "cape", "ptype", "wind"],
            "levels": ["surface"],
            "key": process.env.WINDY_API_KEY
        }),
    })
    const data = await response.json();

    const riptideData = calculateRiptideData(data);

    return NextResponse.json({ riptideData });
}