interface ApiResponse {
    'gust-surface'?: number[],
    'wind_u-surface'?: number[],
    'wind_v-surface'?: number[],
    'past3hprecip-surface'?: number[],
    'temp-surface'?: number[],
    'cape-surface'?: number[],
    'ptype-surface'?: number[],
    'mclouds-surface'?: number[],
    'waves_height-surface'?: number[],
    'waves_direction-surface'?: number[],
    'waves_period-surface'?: number[]
}

interface RiptideData {
    probability: number,
    windSpeed?: number,
    waveHeight?: number,
    temp?: number,
    cape?: number,
    ptype?: number,
    windDirection?: number,
    waveDirection?: number,
    wavePeriod?: number
}

export function calculateRiptideData(response: ApiResponse): RiptideData {
    const riptideScores: number[] = [];

    if (response['temp-surface'] && response['temp-surface'].length > 0) {
        response['temp-surface'].forEach((_, index) => {
            // Define a flag for high risk conditions
            let highRiskConditionMet = false;

            // Check for specific high risk conditions
            if (response['temp-surface']![index] > 305) {
                highRiskConditionMet = true;
            }

            if (
                response['gust-surface']?.[index] !== undefined &&
                response['waves_height-surface']?.[index] !== undefined &&
                response['wind_u-surface']?.[index] !== undefined &&
                response['wind_v-surface']?.[index] !== undefined &&
                response['waves_period-surface']?.[index] !== undefined
            ) {
                const windSpeedScore = normalize(response['gust-surface'][index], 0, 20);
                const waveHeightScore = normalize(response['waves_height-surface'][index], 0, 5);
                const tempScore = normalize(response['temp-surface']![index], 270, 310);
                const capeScore = normalize(response['cape-surface']![index], 0, 100);

                // Calculate wind and wave direction influence
                const windDirection = response['wind_u-surface'][index] !== undefined && response['wind_v-surface'][index] !== undefined
                    ? Math.atan2(response['wind_v-surface'][index], response['wind_u-surface'][index]) * (180 / Math.PI)
                    : 0;
                const waveDirection = response['waves_direction-surface']?.[index] ?? 0;

                // Directional difference can influence the riptide risk
                const directionDifference = normalize(Math.abs(windDirection - waveDirection), 0, 180);

                // Wave period can also influence the risk
                const wavePeriodScore = normalize(response['waves_period-surface'][index], 5, 20);

                const weightedScore = windSpeedScore * 0.25 + waveHeightScore * 1 + tempScore * 0.1 + capeScore * 0.2 + directionDifference * 0.1 + wavePeriodScore * 0.1;
                const riptideProbability = sigmoid(weightedScore);

                riptideScores.push(riptideProbability);
            } else if (highRiskConditionMet) {
                riptideScores.push(1);
            } else {
                riptideScores.push(0);
            }
        });
    }

    return {
        probability: response['waves_height-surface']?.[response['waves_height-surface']?.length - 1] ? riptideScores[riptideScores.length - 1] : 0,
        windSpeed: response['gust-surface']?.[response['gust-surface']?.length - 1] || 0,
        waveHeight: response['waves_height-surface']?.[response['waves_height-surface']?.length - 1] || 0,
        temp: response['temp-surface']?.[response['temp-surface']?.length - 1] || 0,
        cape: response['cape-surface']?.[response['cape-surface']?.length - 1] || 0,
        windDirection: response['wind_u-surface']?.[response['wind_u-surface']?.length - 1] || 0,
        waveDirection: response['waves_direction-surface']?.[response['waves_direction-surface']?.length - 1] || 0,
        wavePeriod: response['waves_period-surface']?.[response['waves_period-surface']?.length - 1] || 0,
    };
}

function normalize(value: number, min: number, max: number): number {
    return (value - min) / (max - min);
}

function sigmoid(x: number): number {
    return 1 / (1 + Math.exp(-x));
}