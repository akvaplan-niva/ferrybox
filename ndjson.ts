import { TextLineStream } from "streams/delimiter.ts";

export async function* ndjsonGenerator(request: Request) {
  if (request.body) {
    const lines = request.body
      .pipeThrough(new TextDecoderStream())
      .pipeThrough(new TextLineStream());

    for await (const line of lines) {
      try {
        if (line?.length > 0) {
          const time = new Date().toJSON();
          yield { time, ...JSON.parse(line) };
        }
      } catch (e) {
        console.error(e);
      }
    }
  }
}
