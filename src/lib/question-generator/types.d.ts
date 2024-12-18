export type Difficulty = "easy" | "intermediate" | "hard";

export type LinearConfig = {
    negFactor: number,
    mulFactor: number,
    divFactor: number,
    constant: number,
    negativeConstant: number
};

export type IntConfig = {
    magRange: [number, number],
    neg: number
};

export type FunctionGroup = {
    functions: string[],
    relativeLikelihood: numner
}

export type FunctionConfig = {
    groups: FunctionGroup[],
    prevent?: string[]
};

export type CombinationConfig = {
    groups: {
        functions: string[],
        relativeLikelihood: number
    }[],
    /**
     * 5-array of the relative likelihoods of creating a chain rule, addition, subtraction,
     * multiplication, or division question.
     */
    typesRelativeLikelihoods: [number, number, number, number, number]
}