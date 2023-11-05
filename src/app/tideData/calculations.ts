interface ApiResponse {
    'gust-surface'?: number[],
    'wind_u-surface'?: number[],
    'wind_v-surface'?: number[],
    'past3hprecip-surface'?: number[],
    'temp-surface'?: number[],
    'cape-surface'?: number[],
    'ptype-surface'?: number[],
    'mclouds-surface'?: number[]
}

interface RiptideData {
    probability: number,
    windSpeed?: number,
    waveHeight?: number,
    temp?: number,
    cape?: number,
    ptype?: number,
}

export function calculateRiptideData(response: ApiResponse): RiptideData {
    const riptideScores: number[] = [];

    if (response['temp-surface'] && response['temp-surface'].length > 0) {
        response['temp-surface'].forEach((_, index) => {
            // Define a flag for high risk conditions
            let highRiskConditionMet = false;

            // Check for specific high risk conditions
            // Example: If temperature is above a certain value, consider it high risk
            if (response['temp-surface']![index] && response['temp-surface']![index] > 305) {
                highRiskConditionMet = true;
            }

            if (
                response['gust-surface']?.[index] !== undefined &&
                response['past3hprecip-surface']?.[index] !== undefined &&
                response['cape-surface']?.[index] !== undefined &&
                response['ptype-surface']?.[index] !== undefined
            ) {
                const windSpeedScore = normalize(response['gust-surface'][index], 0, 20);
                const waveHeightScore = normalize(response['past3hprecip-surface'][index], 0, 0.005);
                const tempScore = normalize(response['temp-surface']![index], 270, 310);
                const capeScore = normalize(response['cape-surface']![index], 0, 50);
                const ptypeScore = response['ptype-surface'][index] > 0 ? 1 : 0;

                const weightedScore = Math.pow(windSpeedScore, 2) * 0.3 + waveHeightScore * 0.3 + tempScore * 0.1 + capeScore * 0.2 + ptypeScore * 0.1
                const riptideProbability = sigmoid(weightedScore);
                // const riptideProbability = weightedScore;
                riptideScores.push(riptideProbability);
            } else if (highRiskConditionMet) {
                // If a high risk condition is met, push 1
                riptideScores.push(1);
            } else {
                // If no high risk condition is met, push 0 or some other default value
                riptideScores.push(0);
            }
        });
    }

    return {
        probability: riptideScores[riptideScores.length - 1],
        windSpeed: response['gust-surface']?.[response['gust-surface']?.length - 1],
        waveHeight: response['past3hprecip-surface']?.[response['past3hprecip-surface']?.length - 1],
        temp: response['temp-surface']?.[response['temp-surface']?.length - 1],
        cape: response['cape-surface']?.[response['cape-surface']?.length - 1],
        ptype: response['ptype-surface']?.[response['ptype-surface']?.length - 1],
    };
}

function normalize(value: number, min: number, max: number): number {
    if (max === min) {
        return 0;
    }
    return (value - min) / (max - min);
}

function sigmoid(x: number): number {
    return 1 / (1 + Math.exp(-x));
}
