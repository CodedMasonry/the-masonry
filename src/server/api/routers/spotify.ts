import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { GetPlayback, GetRecentlyPlayed } from "~/server/spotify";

export const spotifyRouter = createTRPCRouter({
  getPlayback: publicProcedure.query(async () => {
    // If currently played
    const playback = await GetPlayback();
    if (playback != null) {
      return playback
    }
    // Else most recently played
    const recent = await GetRecentlyPlayed();
    return recent ?? null;
  }),
});
