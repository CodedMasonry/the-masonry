import { setTimeout } from "timers/promises";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { GetPlayback, GetRecentlyPlayed } from "~/server/spotify";

export const spotifyRouter = createTRPCRouter({
  getPlayback: publicProcedure.query(async () => {
    let response = null;
    let attempts = 0;
    while (response == null && attempts < 3) {
      // Try get current
      response = await GetPlayback() ?? null;

      // Else try get most recent
      if (response == null) {
        response = await GetRecentlyPlayed();
      }

      // Repeat at least 3 times if it fails to fetch data
      attempts++;
      if (response == null) {
        await setTimeout(100, null);
      }
    }
    
    return response;
  }),
});
