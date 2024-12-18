let last = -1;
export function uniform(min: number = 0, max: number = 1): number {
    const rand = Math.random() * (max - min) + min;

    if (Math.abs(rand - last) < 0.1) return uniform(min, max);
    
    last = rand;
    return rand;
}

export function uniformInt(min: number, max: number): number {
    return Math.floor(uniform(min, max + 1));
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