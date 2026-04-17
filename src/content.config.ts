import { defineCollection } from "astro:content";
import { cldAssetsLoader } from "astro-cloudinary/loaders";

export const collections = {
  photos: defineCollection({
    loader: cldAssetsLoader({
      folder: "TheMasonry",
      limit: 1000,
    }),
  }),
};
