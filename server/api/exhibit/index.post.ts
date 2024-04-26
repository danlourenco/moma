import { consola } from "consola";
import { v4 as uuidv4 } from "uuid";

interface ExhibitPostRequestBody {
  artistStatement: string;
  image: File;
  audio?: File;
  title?: string;
}

const generateNewFileName = (uuid: string, file: File) =>
  `${uuid}.${file.name.split(".").pop()}`;

export default defineEventHandler(async (event) => {
  const uuid = uuidv4();
  const formData = await readFormData(event);

  const image = formData.get("image") as File;
  const artistStatement = formData.get("artistStatement") as string;
  const audio = formData.get("audio") as File;
  const title = formData.get("title") as string;

  const { key: imageKey } = await event.context.cloudflare.env.MEDIA_BUCKET.put(
    generateNewFileName(uuid, image),
    image
  );

  const { key: audioKey } = await event.context.cloudflare.env.MEDIA_BUCKET.put(
    generateNewFileName(uuid, audio),
    audio
  );

  const { success } = await event.context.cloudflare.env.DB.prepare(
    `
    insert into exhibits (image_key, artist_statement, audio_key) values (?, ?, ?)
  `
  )
    .bind(imageKey, artistStatement, audioKey)
    .run();

  if (success) {
    return {
      status: 201,
      text: "Created",
    };
  } else {
    throw createError({
      status: 500,
      message: "Something went wrong",
    });
  }
});
