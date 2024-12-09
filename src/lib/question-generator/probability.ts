export function uniform(min: number = 0, max: number = 1) {
    return Math.random() * (max - min) + min;
}

export function normal(mean: number, variance: number) {
    const U1 = uniform();
    const U2 = uniform();

    return Math.sqrt(variance)*Math.sqrt(2*Math.log(1/U1))*Math.cos(2*Math.PI*U2) + mean;
}