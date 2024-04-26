export default defineEventHandler(async (event) => {
  try {
    const formData = await readFormData(event);
    const image = formData.get("image") as File;
    if (!image) {
      throw createError({
        statusCode: 400,
        statusMessage: "No image found in form data.",
      });
    }
    try {
      return event.context.cloudflare.env.MEDIA_BUCKET.put(image.name, image);
    } catch (error) {
      throw new Error(`Error uploading file to bucket: ${error}`);
    }
  } catch (error) {
    throw new Error(`Error reading form data: ${error}`);
  }
});
