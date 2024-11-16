// Force No Cache
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { env } from "~/env";
import { Redis } from "@upstash/redis";
import { redirect } from "next/navigation";

/// Redis DB for storing info
const redis = Redis.fromEnv({
  latencyLogging: false,
  enableAutoPipelining: true,
});

/// The Actual Endpoint
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const state = searchParams.get("state");
  const code = searchParams.get("code");
  const err = searchParams.get("error");

  if (err != null) {
    return NextResponse.json(
      { message: "Spotify returned an error", error: err },
      { status: 500 },
    );
  }
  if (state == null) {
    return NextResponse.json(
      { message: "Spotify didn't provide a state", error: err },
      { status: 500 },
    );
  }

  try {
    let data = await fetchSpotify(code!);

    await redis.set("SPOTIFY_REFRESH_TOKEN", data.refresh_token);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  } finally {
    redirect("/");
  }
}

/// Function for exchanging code for token
async function fetchSpotify(code: string) {
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
  bodyParams.append("code", code);
  bodyParams.append("redirect_uri", env.SPOTIFY_REDIRECT_URL);
  bodyParams.append("grant_type", "authorization_code");

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers,
      body: bodyParams.toString(),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
}
