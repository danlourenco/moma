import { consola } from "consola";
export default defineEventHandler(async (event) => {
  const objects = await event.context.cloudflare.env.MEDIA_BUCKET.list();
  consola.info(objects);
  return {
    objects,
  };
});
