export function uniform(min: number = 0, max: number = 1) {
    return Math.random() * (max - min) + min;
}

export function choose(relativeLikelihoods: number[]): number {
    const sum = relativeLikelihoods.reduce((a, b) => a + b);
    let U = uniform(0, sum);

    for (let i = 0; i < relativeLikelihoods.length; i++) {
        U -= relativeLikelihoods[i];

        if (U <= 0) return i;
    }

    throw new Error();
}