import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { GetPlayback } from "~/server/spotify";

export const spotifyRouter = createTRPCRouter({
  getPlayback: publicProcedure
    .query(async (opts) => {
      const data = await GetPlayback();
      return data ?? null;
    }),
});
