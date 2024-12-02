export function parenthesize(latex: string, condition: boolean): string {
    return condition ? `\\left(${latex}\\right)` : latex;
}