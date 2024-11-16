"use server";

import { Redis } from "@upstash/redis";
import { unstable_cache } from "next/cache";
import { redirect } from "next/navigation";
import queryString from "query-string";
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
  { revalidate: 1800 },
);

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
  var scope = "user-read-private user-read-email";

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
