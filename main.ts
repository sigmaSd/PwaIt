const main = async () => {
  // Don't mess with users files
  try {
    Deno.statSync("sw.js");
    Deno.statSync("./pwa");
    throw "Aborting due to existing files: sw.js or pwa folder";
  } catch {
    /* the above files don't exist so we're good to go */
  }

  const mainUrl = import.meta.url;
  const baseUrl = new URL(mainUrl.slice(0, mainUrl.lastIndexOf("/")));

  const copyPwaAsset = async (name: string) => {
    await fetch(baseUrl.href + "/assets/pwa/" + name).then((r) =>
      r.body?.pipeTo(
        Deno.createSync("./pwa/" + name).writable,
      )
    );
  };
  Deno.mkdirSync("./pwa");
  await copyPwaAsset("app.js");
  await copyPwaAsset("manifest.json");
  await copyPwaAsset("favicon.png");
  // write service worker
  // we're going to give it scope / so it needs to be in the root of the repo
  await fetch(baseUrl.href + "/assets/sw.js").then((r) =>
    r.body?.pipeTo(
      Deno.createSync("sw.js").writable,
    )
  );
};

if (import.meta.main) {
  await main();
}
