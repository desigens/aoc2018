import { readFileSync } from "fs";
import { resolve } from "path";
import getFrequency from "./lib/1";
import { boxesChecksum, commonLetters } from "./lib/2";
import { getMarkedInchesCount, findNotOverlaped } from "./lib/3";
import { strategy, strategy2 } from "./lib/4";
import { polimerLength, shortestResultPolimer } from "./lib/5";
import { getLargestFiniteArea } from "./lib/6";

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
  console.log("ANSWER 3-2:", findNotOverlaped(input, 1000));
}

{
  const input = readFileSync(resolve(__dirname, "./data/4.txt"), "utf-8");
  console.log("ANSWER 4-1:", strategy(input));
  console.log("ANSWER 4-2:", strategy2(input));
}

{
  const input = readFileSync(resolve(__dirname, "./data/5.txt"), "utf-8");
  console.log("ANSWER 5-1:", polimerLength(input));
  // FIXME very slow
  // console.log("ANSWER 5-2:", shortestResultPolimer(input));
}

{
  const input = readFileSync(resolve(__dirname, "./data/6.txt"), "utf-8");
  console.log("ANSWER 6-1:", getLargestFiniteArea(input));
}
