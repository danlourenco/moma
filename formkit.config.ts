import { defineFormKitConfig } from "@formkit/vue";
import { createMultiStepPlugin } from "@formkit/addons";
import "@formkit/addons/css/multistep";
import { rootClasses } from "./formkit.theme.ts";

export default defineFormKitConfig({
  config: {
    rootClasses,
  },
  plugins: [createMultiStepPlugin()],
  // rules: {},
  // locales: {},
  // etc.
});
