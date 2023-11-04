
type WaveData = {
    waveHeight: number;
    windSpeed: number;
}

const gravity = 9.81;

export const calculateWaveHeight = (waveData: WaveData) => {
    const { waveHeight, windSpeed } = waveData;
    // const waveHeightInFeet = waveHeight * 3.28084;
    // const windSpeedInKnots = windSpeed * 1.94384;
    // const pressureInInches = pressure * 0.02953;

    // const waveEnergy = 0.5 * waterDensity * gravity * Math.pow(waveHeight, 2);

    const windGeneratedWaveHeight = 0.283 * Math.pow(windSpeed, 2);
    return (windGeneratedWaveHeight - waveHeight) / gravity;
}
