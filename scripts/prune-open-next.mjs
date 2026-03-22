import { existsSync, rmSync, statSync } from "node:fs";

const filesToPrune = [
  ".open-next/server-functions/default/node_modules/next/dist/server/capsize-font-metrics.json",
  ".open-next/server-functions/default/handler.mjs.meta.json",
];

let reclaimed = 0;

for (const file of filesToPrune) {
  if (!existsSync(file)) continue;
  const size = statSync(file).size;
  rmSync(file, { force: true });
  reclaimed += size;
  console.log(`pruned ${file} (${(size / 1024 / 1024).toFixed(2)} MiB)`);
}

console.log(`total reclaimed: ${(reclaimed / 1024 / 1024).toFixed(2)} MiB`);
