"use server";

import { Redis } from "@upstash/redis";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { redirect } from "next/navigation";
import queryString from "query-string";
import { z } from "zod";
import { env } from "~/env";

const redis = Redis.fromEnv();

/// Cache Access Token
export const SpotifyAccessToken = unstable_cache(
  async () => {
    console.log("Getting New Access Token");

    // Refresh token save in redis cache due to limited fetch, yet requires persistence
    const refreshToken = await redis.get<string>("SPOTIFY_REFRESH_TOKEN");

    // If there isn't anyone authenticated, ask to authenticate
    if (refreshToken == null) {
      Authenticate();
    }

    return await fetchSpotifyAccess(refreshToken!);
  },
  ["SpotifyAccessToken"],
  { revalidate: 1800, tags: ["spotify"] },
);

const PlaybackSchema = z.object({
  device: z.object({
    name: z.string(),
    type: z.string(),
  }),
  is_playing: z.boolean(),
  shuffle_state: z.boolean(),
  repeat_state: z.enum(["off", "track", "context"]),
  timestamp: z.number(),
  progress_ms: z.number(),
  item: z.object({
    album: z.object({
      album_type: z.string(),
      images: z.array(
        z.object({ height: z.number(), url: z.string(), width: z.number() }),
      ),
      name: z.string(),
      release_date: z.string(),
    }),
    artists: z.array(
      z.object({
        name: z.string(),
      }),
    ),
    duration_ms: z.number(),
    explicit: z.boolean(),
    external_urls: z.object({ spotify: z.string() }),
    name: z.string(),
  }),
});
export type PlaybackResponse = z.infer<typeof PlaybackSchema>;

/// Returns the current playback
export async function GetPlayback() {
  try {
    const token = await SpotifyAccessToken();
    const response = await fetch("https://api.spotify.com/v1/me/player", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (!response.ok) {
      revalidatePath("/");
      return null;
    }
    if (response.status == 204) {
      return null;
    }

    const json = await response.json();
    const parsed = PlaybackSchema.parse(json);

    return parsed;
  } catch (error) {
    console.log("Failed while getting playback: ", error);
  }
}

/*

Authentication Functions

*/

/// Cryptographically secure types
function generateRandomString(length: number): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const randomArray = new Uint8Array(length);
  crypto.getRandomValues(randomArray);
  return Array.from(randomArray, (byte) => chars[byte % chars.length]).join("");
}

/// Handle authenticating user
function Authenticate() {
  var state = generateRandomString(16);
  var scope =
    "user-read-playback-state user-read-currently-playing user-modify-playback-state user-read-recently-played";

  redirect(
    "https://accounts.spotify.com/authorize?" +
      queryString.stringify({
        response_type: "code",
        client_id: env.SPOTIFY_CLIENT_ID,
        scope: scope,
        redirect_uri: env.SPOTIFY_REDIRECT_URL,
        state: state,
      }),
  );
}

/// Function for exchanging code for token
export async function fetchSpotifyAccess(refreshToken: string) {
  // Data for request to spotify
  const headers = {
    "content-type": "application/x-www-form-urlencoded",
    Authorization:
      "Basic " +
      Buffer.from(
        env.SPOTIFY_CLIENT_ID + ":" + env.SPOTIFY_CLIENT_SECRET,
      ).toString("base64"),
  };

  const bodyParams = new URLSearchParams();
  bodyParams.append("refresh_token", refreshToken);
  bodyParams.append("grant_type", "refresh_token");

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers,
      body: bodyParams.toString(),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error. Status: ${response.status}`);
    }

    const data = await response.json();
    return data.access_token as string;
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
}
