import { consola } from "consola";
import { v4 as uuidv4 } from "uuid";

interface ExhibitPostRequestBody {
  artistStatement: string;
  artistName: string;
  details?: string;
  image: File;
  audio?: File;
  title: string;
  medium?: string;
}

const generateNewFileName = (uuid: string, file: File) =>
  `${uuid}.${file.name.split(".").pop()}`;

export default defineEventHandler(async (event) => {
  const uuid = uuidv4();
  const formData = await readFormData(event);

  const image = formData.get("image") as File;
  const artistStatement = formData.get("artistStatement") as string;
  const artistName = formData.get("artistName") as string;

  const details = formData.get("details") as string;

  const audio = formData.get("audio") as File;
  const title = formData.get("title") as string;
  const medium = formData.get("medium") as string;
  console.log("imageName: ", image.name);
  console.log("audio name: ", audio);
  const imagePutResponse = await event.context.cloudflare.env.BUCKET.put(
    generateNewFileName(uuid, image),
    image
  );

  console.log({ imagePutResponse });

  const audioPutResponse = await event.context.cloudflare.env.BUCKET.put(
    generateNewFileName(uuid, audio),
    audio
  );

  console.log({ audioPutResponse });
  const { success } = await event.context.cloudflare.env.DB.prepare(
    `
    insert into exhibits (
      image_key, 
      artist,
      details,
      title,
      medium,
      artist_statement, 
      audio_key) values (?, ?, ?, ?, ?, ?, ?)
  `
  )
    .bind(
      imagePutResponse.key,
      artistName,
      details,
      title,
      medium,
      artistStatement,
      audioPutResponse.key
    )
    .run();

  if (success) {
    return {
      status: 201,
      data: {
        imagePutResponse,
        audioPutResponse,
      },
    };
  } else {
    throw createError({
      status: 500,
      message: "Something went wrong",
    });
  }
});
