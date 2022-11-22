import { ferryboxOptions } from "./config.ts";
import { times } from "./time.ts";
import { endpointURL, messagesByISODateURL } from "./routes.ts";
export const markup = (base: string) => {
  const lang = "en";
  const now = new Date();
  const { isodate } = times(now);
  const { endpoints, serviceVersion } = ferryboxOptions;

  const listEndpoints = (d: string[] = []) => {
    for (const endpoint of endpoints) {
      const url = endpointURL({ base, endpoint });
      const line = `<br><a href="${url}">${url}</a>`;
      d.push(line);
    }
    return d.join("\n");
  };

  const listDates = (d: string[] = []) => {
    for (const endpoint of endpoints) {
      const url = endpointURL({ base, endpoint });
      const line = `<br><code>HTML: <a href="${url}">${url}</a></code>`;
      d.push(line);
    }
    return d.join("\n");
  };
  const messagesByISODate = (d: string[] = []) => {
    for (const endpoint of endpoints) {
      const url = messagesByISODateURL({ base, endpoint, isodate });
      d.push(
        `<br><code>NDJSON: <a href="${url}">${url}</a></code>`,
      );
    }
    return d.join("\n");
  };

  return `<article lang="${lang}">
  
<section id="ferrybox-data-service">
  <h1>FerryBox data service (${serviceVersion})</h1>
  <p>Near realtime <a href="https://www.niva.no/miljodata-pa-nett/ferrybox-ships-of-opportunity" rel="noopener noreferrer">FerryBox</a> data service for <a href="https://akvaplan.niva.no/" rel="noopener noreferrer">Akvaplan-niva</a>.</p>
</section>
  
<section id="get">
  <h2>Read (GET)</h2>
  <p>Data is retrieved using HTTP GET to one of the FerryBox URLs below:</p>
  <p>Messages by date
${messagesByISODate()}
</p>
  <p>List of available data
${listDates()}</p>
  <h3>Formats</h3>
  <p>The following response formats are planned: HTML, NDJSON, TSV, GeoJSON.</p>
</section>

<section id="post">
  <h2>Create (POST)</h2>
  
  <p>Messages are created when a FerryBox or other client sends a valid HTTP POST request to a FerryBox URL on this service.
  On success, the service responds with HTTP status 201 Created.</p>

  <p>The client must identify itself by sending a valid basic authorization header, or else 401 Unauthorized is returned.</p>

  <p>The POST body must consist of a single JSON message object, or several objects separated by a newline (NDJSON).
 Each message object is validated against a <a href="https://jsontypedef.com/">JSON Type Definition</a>.
 The server sends HTTP status 422 Unprocessable Entity on failure to validate.</p>

  <p><code>POST URL: ${listEndpoints()}</code></p>

</section>

<section id="data">
  <h2>Data</h2>
  <h3>General</h3>
  <p>Messages sent to and from this service has a ~1-minute interval .</p>
  <p>All time elements contains <a href="https://www.rfc-editor.org/rfc/rfc3339">RFC 3339</a> formatted coordinated universal time.</p>


  <h3>Open data</h3>
  <p>
    <a href="${base}">FerryBox oceanography</a>, by <a rel="dct:creator"><a href="https://akvaplan.niva.no/">Akvaplan-niva</a>, is open data in the public domain, free of known copyright restrictions.
    <a rel="license" href="http://creativecommons.org/publicdomain/mark/1.0/">
      <span><img alt="cc logo" src="https://creativecommons.org/images/deed/cc_icon_white_x2.png" width="24" /></span>
      <span><img alt="cc pd" src="https://creativecommons.org/images/deed/zero_white_x2.png" width="24" /></span>
    </a>
  </a></p>
</section>

<section id="credits">
  <h2>Credits</h2>

  <h3>Funding</h3>
  <p>Akvaplan-niva's FerryBox operations are funded via <a href="https://prosjektbanken.forskningsradet.no/project/FORISS/269922" rel="noopener noreferrer">Research Council of Norway</a>'s funding of the <a href="https://www.niva.no/en/projectweb/norsoop" rel="noopener noreferrer">NorSOOP</a> program.</p>

  <h3>Open source</h3>
  <p>The FerryBox data service is open source and in git version control on <a href="https://github.com/akvaplan-niva/ferrybox" rel="noopener noreferrer">akvaplan-niva/ferrybox</a></p>
</section>

</article>`;
};

/*
Per FerryBox
const desc = new Map<string, string>([
  [
    "ferrybox-akvaplan1",
    `Test data from FerryBox in field boat [Louise](https://www.akvaplan.niva.no/ms-louise/)`,
  ],
]);

<h3>Sensors</h3>
  <p>…</p>

  <h3>Formats</h3>
  <p>…</p>

  <h3>Variables</h3>
  <p>…</p>

*/
