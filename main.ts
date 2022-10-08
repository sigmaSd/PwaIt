import { ensureDirSync } from "https://deno.land/std@0.152.0/fs/ensure_dir.ts";

const main = async () => {
  ensureDirSync("./static/pwa");

  const mainUrl = import.meta.url;
  const baseUrl = new URL(mainUrl.slice(0, mainUrl.lastIndexOf("/")));
  if (baseUrl.protocol === "file:") {
    throw "this script is intended to be used remotely for now";
  } else if (baseUrl.protocol === "https:") {
    const copyPwaRemoteAsset = async (name: string) => {
      await fetch(baseUrl.href + "/pwa/" + name).then((r) =>
        r.body?.pipeTo(
          Deno.createSync("./static/pwa/" + name).writable,
        )
      );
    };
    await copyPwaRemoteAsset("app.js");
    await copyPwaRemoteAsset("manifest.json");
    await copyPwaRemoteAsset("favicon.png");
  } else {
    throw "unimplemented protocol: " + baseUrl.protocol;
  }

  Deno.writeTextFileSync(
    "./static/serviceWorker.js",
    /*javascript*/ `self.addEventListener("fetch", () => {
      // needed to make the app installable
    });
`,
  );
};

if (import.meta.main) {
  await main();
}
