# PwaIt

Script to kick start pwa app

## Usage

`deno run -r https://github.com/sigmaSd/PwaIt/raw/master/main.ts`

This will create a static folder that contains most of the needed files.

The rest depends on your project, see the next section for examples.

## Examples

**Simple web app:**

- Run the script inside the project root directory
- edit `static/pwa/manifest.json`

```diff
-      "src": "/pwa/favicon.png",
+      "src": "/static/pwa/favicon.png",
```

- Create `index.html`

```html
<script defer src="/static/pwa/app.js"></script>
<head>
    <link rel="manifest" href="/static/pwa/manifest.json" />
</head>
<h1>hello</h1>
```

- Start `python -m http.server`
- Open `localhost:8000`

**deno fresh project:**

- Run the script inside the project root directory
- Add the needed header in one of your entry routes for example
  `routs/index.tsx` or `routes/_app.tsx`

```jsx
import { Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <div>
      <Head>
        <link rel="manifest" href="/pwa/manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <script defer src="/pwa/app.js" />
      <button>Ok!</button>
    </div>
  );
}
```

- Run `deno task start`
- open `localhost:8000`

## Tips

- Use chromium instead of firefox for this, firefox support seems to be
  intentionally incomplete
- open `localhost:8000` not `0.0.0.0:8000` pwa are sensitive to insecure pages
