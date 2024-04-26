import { consola } from "consola";
export default defineEventHandler(async (event) => {
  consola.log("getting results");
  const { results } = await event.context.cloudflare.env.DB.prepare(
    "SELECT * FROM exhibits"
  ).all();
  return { results };
});
