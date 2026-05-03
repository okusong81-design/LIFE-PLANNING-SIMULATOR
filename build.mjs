import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");

async function createStandaloneHtml() {
  const [css, js] = await Promise.all([
    readFile(path.join(root, "src", "styles.css"), "utf8"),
    readFile(path.join(root, "src", "App.js"), "utf8"),
  ]);
  const safeJs = js.replaceAll("</script>", "<\\/script>");

  return `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>将来資産シミュレーター</title>
    <script type="importmap">
      {
        "imports": {
          "react": "https://esm.sh/react@18.3.1",
          "react-dom/client": "https://esm.sh/react-dom@18.3.1/client"
        }
      }
    </script>
    <script>
      window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
    </script>
    <script defer src="/_vercel/insights/script.js"></script>
    <style>
${css}
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module">
${safeJs}
    </script>
  </body>
</html>
`;
}

await rm(dist, { recursive: true, force: true });
await mkdir(path.join(dist, "src"), { recursive: true });
await cp(path.join(root, "index.html"), path.join(dist, "index.html"));
await cp(path.join(root, "src", "App.js"), path.join(dist, "src", "App.js"));
await cp(path.join(root, "src", "styles.css"), path.join(dist, "src", "styles.css"));
await writeFile(path.join(dist, "standalone.html"), await createStandaloneHtml(), "utf8");
