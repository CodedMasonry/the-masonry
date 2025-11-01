import { defineCollection, z } from "astro:content";
import { cldAssetsLoader } from "astro-cloudinary/loaders";

export const collections = {
  photos: defineCollection({
    loader: cldAssetsLoader({
      folder: "TheMasonry",
    }),
    schema: z
      .object({
        id: z.string(),
        data: z
          .object({
            asset_id: z.string(),
            public_id: z.string(),
            format: z.string(),
            version: z.number(),
            resource_type: z.enum(["image", "video", "raw"]),
            type: z.enum(["upload", "private", "authenticated"]),
            created_at: z.string().datetime(),
            bytes: z.number(),
            width: z.number(),
            height: z.number(),
            asset_folder: z.string(),
            display_name: z.string(),
            url: z.string().url(),
            secure_url: z.string().url(),
          })
          .passthrough(),
        digest: z.string(),
        collection: z.string(),
      })
      .passthrough(),
  }),
};
