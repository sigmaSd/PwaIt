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

  console.log(
    "`sw.js` `pwa` have been downloaed to cwd, to make pwa work follow the next steps:",
  );
  console.log();
  console.log(
    "- Make sure `sw.js` and `pwa` are acessible from the root of your site",
  );
  console.log();
  console.log("- Modify `pwa/manifest.json` as you like");
  console.log();
  console.log("- Add the next lines to your `index.html` to activate pwa");
  console.log(`\
<script defer src="/pwa/app.js"></script>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="manifest" href="/pwa/manifest.json" />
</head>`);
};

if (import.meta.main) {
  await main();
}
