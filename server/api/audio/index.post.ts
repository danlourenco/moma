import { consola } from "consola";

export default defineEventHandler(async (event) => {
  consola.info(event.context.cloudflare.env);

  const config = useRuntimeConfig(event);
  const { text } = await readBody(event);

  const voice = {
    name: "Nova",
    id: `ClCJCctiyh2dhHQ3SBL6`,
  };
  consola.box(`Start: Generating Speech with voice ${voice.name}`);

  const stream = await $fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voice.id}`,
    {
      headers: {
        "xi-api-key": config.elevenLabsKey,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: {
        model_id: "eleven_multilingual_v2",
        text,
        voice_settings: {
          similarity_boost: 0.75,
          stability: 0.5,
          use_speaker_boost: true,
          style: 0,
        },
      },
      // responseType: "stream",
    }
  );
  consola.start("Done generating speech...");
  consola.info("sending stream to client...");

  return new Response(stream, {
    status: 200,
    headers: {
      "Content-Type": "audio/mpeg",
      "Content-Disposition": `attachment; filename="${voice.name}.mp3"`,
    },
  });
});
