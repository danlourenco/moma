export default defineEventHandler(async (event) => {
  const fileName = getRouterParam(event, "fileName") as string;
  const object = await event.context.cloudflare.env.MEDIA_BUCKET.get(fileName);

  if (object === null) {
    throw createError({
      statusCode: 404,
      statusMessage: "File name not found in bucket.",
    });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);

  return new Response(object.body, {
    headers,
  });
});
