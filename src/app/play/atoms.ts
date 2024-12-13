import Function from "@/lib/symbo-diff/Function";
import { atom } from "jotai";

export const answerLatexAtom = atom<string>("");

export const questionsAtom = atom<Function[]>([]);

export const currentQuestionIndexAtom = atom<number>(0);

export const answersLatexAtoms = atom<string[]>([]);