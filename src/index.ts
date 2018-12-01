import { readFileSync, readdir, readdirSync } from "fs";
import { resolve } from "path";

import getFrequency from "./lib/1";
const input = readFileSync(resolve(__dirname, "./data/1.txt"), "utf-8");
console.log("ANSWER 1-1:", getFrequency(input, "\n"));
console.log("ANSWER 1-2:", getFrequency(input, "\n", true));
