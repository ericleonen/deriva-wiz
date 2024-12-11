import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

if (process.argv.length !== 4) {
    throw new Error("buildMatrix accepts exactly two parameters");
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
    const difficulty = process.argv[2];
    const matrixType = process.argv[3];
    const matrixFilePath = path.resolve(__dirname, `matrixCSVs/${difficulty}-${matrixType}.csv`);
    const text = readFileSync(matrixFilePath, "utf8");
    
    const matrix = [];

    text.split("\n").forEach((rowText, row) => {
        if (row === 0) return;

        const matrixRow = rowText.split(",").map(item => +item);
        matrixRow.shift();

        matrix.push(matrixRow);
    })

    const matricesJSONFilePath = path.resolve(__dirname, `index.json`);
    const matricesJSONString = readFileSync(matricesJSONFilePath, "utf8");
    const matricesJSON = JSON.parse(matricesJSONString);

    matricesJSON[difficulty][matrixType] = matrix;

    writeFileSync(matricesJSONFilePath, JSON.stringify(matricesJSON), "utf8");
} catch (err) {
    console.log(err);
}