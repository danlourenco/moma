export const toBase64 = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const audioUrlToFile = (
  audioSrc: string,
  fileName?: string
): Promise<File> =>
  $fetch(audioSrc).then((audioBlob) => {
    return new File([audioBlob], `${fileName ? fileName : "audio"}.mp3`, {
      type: "audio/mpeg",
    });
  });
