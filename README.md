# PwaIt

Script to kick start pwa app

## Usage

```
deno run -r https://github.com/sigmaSd/PwaIt/raw/master/main.ts
```

This will create a static folder that contains most of the needed files.

The rest depends on your project, see the next section for examples.

## Examples

**Simple web app:**

- Run the script inside the project root directory
- Create `index.html`

```html
<script defer src="/pwa/app.js"></script>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="manifest" href="/pwa/manifest.json" />
</head>
<h1>hello</h1>
```

- Start a server for example
  `deno run -A https://deno.land/std/http/file_server.ts -p 8000`
- Open `localhost:8000`

**deno fresh project:**

- Run the script inside the project root directory
- The `./static` folder is special in fresh, as in all of its contents is dumped
  to the root of the web page, so move the created assets to it, for example:
  `mv pwa sw.js ./static` (make sure `./static` exists)
- Add the needed manifest link + script in one of your entry routes for example
  `routs/index.tsx` or `routes/_app.tsx`

```jsx
import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <div>
      <Head>
        <link rel="manifest" href="/pwa/manifest.json" />
      </Head>
      <script defer src="/pwa/app.js" />
      <button>Ok!</button>
    </div>
  );
}
```

- Run `deno task start`
- open `localhost:8000`

## Enable offline usage

Open the created `sw.js` and uncomment the relevent lines, be sure to read
through the linked mdn link there.

## Tips

- For developping, use chromium
- For installing the application on mobile use chrome, it has the most advanced
  implementation

- open `localhost:8000` not `0.0.0.0:8000` pwa are sensitive to insecure pages
- For some reason port 8000 seems to matter, It didn't work with a different
  port
- For offline usage the cache should be cleared with the activate singal, but
  Its not clear if this really gets triggered, you can always change the
  cacheName to make sure the app gets updated
- Something annoying about chromium in linux, is if I cache a pwa app, and make
  it work offline, now anytime I open localhost:8000 it gets redirected to the
  app even if I open a server in some new location, android chrome doesn't seem
  to have this issue

## Why

To have a nice loading screen on mobile, also support for
[share-target](https://web.dev/web-share-target/)

https://github.com/sigmaSd/ytdlf
![ytdown](https://user-images.githubusercontent.com/22427111/194713700-d9b7a592-4165-4b3b-b5eb-f370785c1f22.png)

## More examples

- https://github.com/sigmaSd/datediff https://datediff.deno.dev/
