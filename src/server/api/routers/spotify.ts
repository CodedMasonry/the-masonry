import { setTimeout } from "timers/promises";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  GetPlayback,
  GetRecentlyPlayed,
  GetTopArtists,
  GetTopTracks,
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

  // Gets top Artists & Tracks
  getTopItems: publicProcedure.query(async () => {
    let topArtists = null;
    let topTracks = null;
    let attempts = 0;

    while (topArtists == null && topTracks == null && attempts < 3) {
      // Try get current
      topArtists = (await GetTopArtists()) ?? null;
      topTracks = (await GetTopTracks()) ?? null;

      // Repeat at least 3 times if it fails to fetch data
      attempts++;
      if (topArtists == null || topTracks == null) {
        await setTimeout(100, null);
      }
    }

    return { topArtists, topTracks };
  }),
});
