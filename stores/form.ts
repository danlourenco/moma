import { defineStore } from "pinia";

export const useFormStore = defineStore("form", {
  state: () => {
    return {
      artistStatementRequestInFlight: false,
      audioRequestInFlight: false,
      artistName: "",
      artistBirthYear: "",
      audio: "",
      medium: "",
      details: "",
      title: "",
      artistStatement: "",
      selectedImage: null,
    };
  },
  getters: {},
  actions: {
    async generateArtistStatement() {
      if (!this.selectedImage) {
        throw new Error("No image provided. Please select an image.");
      }
      const base64encodedImage = await toBase64(this.selectedImage);
      this.artistStatementRequestInFlight = true;
      const res = await $fetch("/api/artist-statement", {
        method: "POST",
        body: JSON.stringify({
          image: base64encodedImage,
        }),
      });
      this.artistStatementRequestInFlight = false;

      const responseText = res.response.choices[0].message.content as string;
      const sentences = responseText.split(/\.\s/);

      this.title = sentences[0].replace(/\.$/, "");
      this.artistStatement = sentences.slice(1).join(". ");
    },

    async generateAudio() {
      try {
        this.audioRequestInFlight = true;
        const res = await $fetch("/api/audio", {
          method: "POST",
          body: JSON.stringify({ text: this.artistStatement }),
        });
        this.audio = URL.createObjectURL(res);
      } catch (e) {
        console.error(e);
      } finally {
        this.audioRequestInFlight = false;
      }
    },
  },
});
