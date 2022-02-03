#!/usr/bin/env node

const friendlyWords = require("friendly-words");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const argv = yargs(hideBin(process.argv))
  .describe("l", "List to pick words from")
  .default("l", "objects")
  .choices("l", Object.keys(friendlyWords))
  .alias("l", "list")
  .describe("n", "Number of words to print")
  .number("n")
  .default("n", 1)
  .alias("n", "words")
  .help("h")
  .alias("h", "help")
  .strict()
  .check(({ n }) => {
    if (n < 0) {
      throw new Error("Number of words cannot be set negative");
    }
    return true;
  }).argv;

const list = friendlyWords[argv.list];
const words = [...Array(argv.n).keys()].map(
  () => list[Math.floor(Math.random() * list.length)]
);

for (const word of words) {
  console.log(word);
}
