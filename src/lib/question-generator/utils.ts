export function column(matrix: number[][], col: number): number[] {
    return matrix.map(row => row[col]);;
}

export function multiply(matrix: number[][], column: number[]): number[][] {
    return matrix.map((row, rowIndex) => row.map((value) => value * column[rowIndex]))
}