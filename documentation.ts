import { CSS as gfmcss, render } from "gfm/mod.ts";
import "prismjs/components/prism-bash?no-check";
import { ferryboxOptions } from "./config.ts";
import { times } from "./time.ts";

export { gfmcss };

//const code = (text, lang = "") => `\`\`\`${lang}\n${text}\n\`\`\``;

const markdown = (base: string) => {
  const now = new Date();
  const { isodate } = times(now);
  const { endpoints } = ferryboxOptions;

  const endpointsOverview = () => {
    const d = [];
    for (const endpoint of endpoints) {
      const url = `/${endpoint}/${isodate}`;
      d.push(
        `<li><a href="/${endpoint}">${endpoint}</a> | <a href="${url}">today</a></li>`,
      );
    }
    return d.join("\n");
  };

  return `# FerryBox data service

Near realtime [FerryBox](https://www.niva.no/miljodata-pa-nett/ferrybox-ships-of-opportunity) data service for [Akvaplan-niva](https://akvaplan.niva.no).
The oceanography variables on the FerryBox have 1-minute resolution. Data is sent every 1-15 minutes to one of the endpoints below.

## Endpoints

${endpointsOverview()}

## Service documentation

### GET
Daily messages are available at \`/$endpoint/$isodate\`.

### POST
Messages are creating by sending a JSON or NDJSON body and authorization header to a FerryBox endpoint via HTTP POST.

Each message _must_ have the following members:

- \`time\` GPS time/sensor time (ISO8601)
- \`lon\`: longitude
- \`lat\`: latitude 

## Credits
### Open source
The FerryBox data service is open source and in git version control:
https://github.com/akvaplan-niva/ferrybox

### Funding
Akvaplan-niva's FerryBox operations are funded via [Research Council of Norway](https://prosjektbanken.forskningsradet.no/project/FORISS/269922)'s funding of the [NorSOOP](https://www.niva.no/en/projectweb/norsoop) program.

### Open data
${cc0(base)}`;
};

export const cc0 = (base: string) =>
  `<div xmlns:dct="http://purl.org/dc/terms/">
  <p>
    <a href="${base}" property="dct:title">FerryBox oceanography</a>, by <a rel="dct:creator"><a href="https://akvaplan.niva.no/" property="dct:title">Akvaplan-niva</a>, is open data in the public domain, free of known copyright restrictions.
    <a class="cc-icon" rel="license" href="http://creativecommons.org/publicdomain/mark/1.0/">
      <span id="cc-logo" class="icon"><img alt="cc logo" src="https://creativecommons.org/images/deed/cc_icon_white_x2.png" width=24></span>
      <span class="icon"><img alt="cc pd" src="https://creativecommons.org/images/deed/zero_white_x2.png" width=24></span>
    </a>
  </p>
</div>`;

export const htmldocs = (base: string, lang: string) =>
  lang === "en"
    ? render(markdown(base), { baseUrl: base })
    : new Error("Unsupported language");

if (import.meta.main) {
  const md = markdown(location.href);
  console.log(md);
}
