import { readFileSync, readdir, readdirSync } from "fs";
import { resolve } from "path";
import getFrequency from "./lib/1";
import { boxesChecksum, commonLetters } from "./lib/2";
import { getMarkedInchesCount } from "./lib/3";

{
  const input = readFileSync(resolve(__dirname, "./data/1.txt"), "utf-8");
  console.log("ANSWER 1-1:", getFrequency(input, "\n"));
  console.log("ANSWER 1-2:", getFrequency(input, "\n", true));
}

{
  const input = readFileSync(resolve(__dirname, "./data/2.txt"), "utf-8");
  console.log("ANSWER 2-1:", boxesChecksum(input.split("\n")));
  console.log("ANSWER 2-2:", commonLetters(input.split("\n")));
}

{
  const input = readFileSync(resolve(__dirname, "./data/3.txt"), "utf-8");
  console.log("ANSWER 3-1:", getMarkedInchesCount(input, 1000));
}
