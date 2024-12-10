export function readMatrixCSV(CSV: string): number[][] {
    const matrix: number[][] = [];

    CSV.split("\n").forEach((rowText: string, row: number) => {
        const rowItems = rowText.split(",");
        matrix.push(rowItems.map(item => +item));
    });

    return matrix;
}

export function column(matrix: number[][], col: number): number[] {
    return matrix.map(row => row[col]);;
}

export function multiply(matrix: number[][], column: number[]): number[][] {
    return matrix.map((row, rowIndex) => row.map((value) => value * column[rowIndex]))
}