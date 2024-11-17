import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { GetPlayback } from "~/server/spotify";

export const spotifyRouter = createTRPCRouter({
  getPlayback: publicProcedure.query(async () => {
    const data = await GetPlayback();
    return data ?? null;
  }),
});
