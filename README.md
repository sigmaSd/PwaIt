# PwaIt

Script to kick start pwa app

## Usage

Run on the root of your project

```
deno run -r https://github.com/sigmaSd/PwaIt/raw/master/main.ts
```

This will create `sw.js` and `pwa` folder.

The rest depends on your project, see the next section for examples.

## Examples

**Simple web app:**

- Run the script inside the project root directory
- Create `index.html`

```html
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="manifest" href="/pwa/manifest.json" />
</head>
<script defer src="/pwa/app.js"></script>
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

**Svelte**

- Move the created pwa and sw.js to `public` folder
- Copy the relevent lines from `index.html` from the `Simple web app` to svelte
  index.html

## Offline usage

The app will cache all requests by default whenever there is network so it can
work offline. This behaviour is defined in `sw.js`. When a network connection is
available it will automaticly override the cache with the newer remote resources.

## Tips

- For developping, use chromium
- For installing the application on mobile use chrome, it has the most advanced
  implementation

- Open `localhost:8000` not `0.0.0.0:8000` pwa are sensitive to insecure pages
- If you hack on `sw.js` sometimes bug happens and you have to manually unregister the service
  worker. To do that go to the site, open the console and unregister the service
  worker in the Application tab, in android chrome go to settings, and click on
  clear site date

## Why

To have a nice loading screen on mobile, also support for
[share-target](https://web.dev/web-share-target/)

https://github.com/sigmaSd/ytdlf
![ytdown](https://user-images.githubusercontent.com/22427111/194713700-d9b7a592-4165-4b3b-b5eb-f370785c1f22.png)

## More examples

- https://github.com/sigmaSd/datediff https://datediff.deno.dev/
- https://github.com/sigmaSd/magic-cam https://magic-cam.deno.dev/

## More Info about PWA
- https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps
- https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Tutorials/js13kGames/Offline_Service_workers
- https://whatpwacando.today/
