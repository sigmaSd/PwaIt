import { ensureDirSync } from "https://deno.land/std@0.152.0/fs/ensure_dir.ts";

const main = () => {
  ensureDirSync("./static");
  const mainUrl = import.meta.url;
  const baseUrl = mainUrl.slice(0,mainUrl.lastIndexOf("/"));
  console.log(baseUrl);
};

if (import.meta.main) {
  main();
}
