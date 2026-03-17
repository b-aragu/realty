import { cpSync, existsSync, writeFileSync } from "node:fs";

const src = ".open-next/assets";
const dest = ".open-next";

if (!existsSync(src)) {
  console.log(`skip asset sync: missing ${src}`);
  process.exit(0);
}

cpSync(src, dest, { recursive: true, force: true });
console.log(`synced static assets from ${src} to ${dest}`);

const routes = {
  version: 1,
  include: ["/*"],
  exclude: ["/_next/static/*", "/images/*", "/*.svg", "/favicon.ico"],
};

writeFileSync(`${dest}/_routes.json`, `${JSON.stringify(routes, null, 2)}\n`, "utf8");
console.log(`wrote ${dest}/_routes.json for static asset passthrough`);
