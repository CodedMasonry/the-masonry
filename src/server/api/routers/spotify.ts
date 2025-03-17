import { setTimeout } from "timers/promises";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  GetPlayback,
  GetRecentlyPlayed,
  GetTopArtists,
  GetTotalTracks,
} from "~/server/spotify";

export const spotifyRouter = createTRPCRouter({
  // Gets current / most recent play state
  getPlayback: publicProcedure.query(async () => {
    let response = null;
    let attempts = 0;
    while (response == null && attempts < 3) {
      // Try get current
      response = (await GetPlayback()) ?? null;

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

  // Gets top Artists & Total Tracks
  getTopItems: publicProcedure.query(async () => {
    let topArtists = null;
    let totalTracks = null;
    let attempts = 0;

    while (topArtists == null && totalTracks == null && attempts < 3) {
      // Try get current
      topArtists = (await GetTopArtists()) ?? null;
      totalTracks  = (await GetTotalTracks()) ?? null;

      // Repeat at least 3 times if it fails to fetch data
      attempts++;
      if (topArtists == null || totalTracks == null) {
        await setTimeout(100, null);
      }
    }

    return { topArtists, topTracks: totalTracks };
  }),
});
