import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");

async function createStandaloneHtml() {
  const [html, css, js] = await Promise.all([
    readFile(path.join(root, "index.html"), "utf8"),
    readFile(path.join(root, "src", "styles.css"), "utf8"),
    readFile(path.join(root, "src", "App.js"), "utf8"),
  ]);
  const head = html.match(/<head>([\s\S]*?)<\/head>/i)?.[1] ?? "";
  const standaloneHead = head
    .replace(
      /<link\s+rel="stylesheet"\s+href="\.\/src\/styles\.css"\s*\/?>/i,
      `<style>\n${css}\n    </style>`,
    )
    .replace(/<script\s+type="module"\s+src="\.\/src\/App\.js"><\/script>/i, "");
  const safeJs = js.replaceAll("</script>", "<\\/script>");

  return `<!doctype html>
<html lang="ja">
  <head>
${standaloneHead.trimEnd()}
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
await cp(path.join(root, "public"), dist, { recursive: true, force: true });
await writeFile(path.join(dist, "standalone.html"), await createStandaloneHtml(), "utf8");
