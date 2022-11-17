import { ferryboxOptions } from "./config.ts";
import { times } from "./time.ts";
import { endpointURL, messagesByISODateURL } from "./routes.ts";
export const markup = (base: string) => {
  const lang = "en";
  const now = new Date();
  const { isodate } = times(now);
  const { endpoints } = ferryboxOptions;

  const listDates = (d: string[] = []) => {
    for (const endpoint of endpoints) {
      const url = endpointURL({ base, endpoint });
      d.push(
        `<br><a href="${url}">${url}</a>`,
      );
    }
    return d.join("\n");
  };
  const messagesByISODate = (d: string[] = []) => {
    for (const endpoint of endpoints) {
      const url = messagesByISODateURL({ base, endpoint, isodate });
      d.push(
        `<br><a href="${url}">${url}</a> (today)`,
      );
    }
    return d.join("\n");
  };

  return `<article lang="${lang}">
  
<section id="ferrybox-data-service">
  <h1>FerryBox data service</h1>
  <p>Near realtime <a href="https://www.niva.no/miljodata-pa-nett/ferrybox-ships-of-opportunity" rel="noopener noreferrer">FerryBox</a> data service for <a href="https://akvaplan.niva.no/" rel="noopener noreferrer">Akvaplan-niva</a>.</p>
</section>
  
<section id="service">
  <h2>HTTP service documentation</h2>
  
  <h3 id="get">Read</h3>
  <p>Data is retrieved using a HTTP GET to one of the routes below.</p>
  <p>Messages by iso date: ${messagesByISODate()}</p>
  <p>List of available resource URLs: ${listDates()}</p>

  <h3 id="post">Create</h3>
  <p>Messages are created when a FerryBox sends a HTTP POST to the endpoint URL.
  The POST request must have a valid authorization header and a valid JSON or NDJSON body.
  </p>
</section>

<section id="data">
  <h2>Data</h2>
  <p>The data in this service is raw and unprocessed.</p>

  <h3>Formats</h3>
  <p>…</p>

  <h3>Variables</h3>
  <p>…</p>

  <h3>Sensors</h3>
  <p>…</p>

  <h3>Time resolution</h3>
  <p>The oceanography variables are recorded with a 1-minute resolution, ie. each row of data has a point time, but the values provided are mean values of the preceeding 60 seconds.</p>
</section>

<section id="credits">
  <h2>Credits</h2>
  
  <h3>Open source</h3>
  <p>The FerryBox data service is open source and in git version control on <a href="https://github.com/akvaplan-niva/ferrybox" rel="noopener noreferrer">akvaplan-niva/ferrybox</a></p>
  
  <h3>Funding</h3>
  <p>Akvaplan-niva's FerryBox operations are funded via <a href="https://prosjektbanken.forskningsradet.no/project/FORISS/269922" rel="noopener noreferrer">Research Council of Norway</a>'s funding of the <a href="https://www.niva.no/en/projectweb/norsoop" rel="noopener noreferrer">NorSOOP</a> program.</p>
  
  <h3>Open data</h3>
  <p>
    <a href="${base}">FerryBox oceanography</a>, by <a rel="dct:creator"><a href="https://akvaplan.niva.no/">Akvaplan-niva</a>, is open data in the public domain, free of known copyright restrictions.
    <a rel="license" href="http://creativecommons.org/publicdomain/mark/1.0/">
      <span><img alt="cc logo" src="https://creativecommons.org/images/deed/cc_icon_white_x2.png" width="24" /></span>
      <span><img alt="cc pd" src="https://creativecommons.org/images/deed/zero_white_x2.png" width="24" /></span>
    </a>
  </a></p>
</section>

</article>`;
};
