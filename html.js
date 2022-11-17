import { markup } from "./documentation.ts";

const buildhtml = ({ base, lang, markup }) =>
  `<!DOCTYPE html>
<html lang="${lang}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="color-scheme" "content="dark">
    <base href="${base}">
    <title>Service documentation – FerryBox oceanography</title>
    <link rel="stylesheet" href="/static/css/root.css">
    <script type="module">
      import "https://graphical-profile.vercel.app/index.js";
    </script>
  </head>
  <body class="dark">
  
    <header>
      <apn-logo white></apn-logo>
    </header>

    <main data-color-mode="dark" data-light-theme="light" data-dark-theme="dark" class="markdown-body">
      ${markup}
    </main>

    <footer><apn-logo white></apn-logo></footer>

  </body>
</html>`;

export const welcome = (request) => {
  const base = request.url;
  const lang = "en";
  const htmldocs = markup(base, lang);
  const html = buildhtml({ base, lang, markup: htmldocs });
  return new Response(html, {
    status: 200,
    headers: { "content-type": "text/html" },
  });
};
