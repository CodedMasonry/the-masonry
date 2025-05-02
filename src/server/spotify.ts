"use server";

import { Redis } from "@upstash/redis";
import { unstable_cache } from "next/cache";
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
			console.log("Authentication needed");
		}

		return await getAccessToken(refreshToken!);
	},
	["SpotifyAccessToken"],
	{ revalidate: 1800, tags: ["spotify"] },
);

/*

Schemas for re-used responses

*/

// A Spotify Arists
const ArtistSchema = z.object({
	external_urls: z.object({
		spotify: z.string().url(),
	}),
	genres: z.array(z.string()),
	images: z.array(
		z.object({
			url: z.string().url(),
		}),
	),
	name: z.string(),
});

// A Spotify Track
const TrackSchema = z.object({
	album: z.object({
		images: z.array(z.object({ url: z.string() })),
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
	external_urls: z.object({ spotify: z.string().url() }),
	name: z.string(),
});

/*

Spotify API Response Schemas

*/

// Get Playback State API
const SpotifyPlaybackSchema = z
	.object({
		device: z.object({
			name: z.string(),
			type: z.string(),
		}),
		is_playing: z.boolean(),
		shuffle_state: z.boolean(),
		repeat_state: z.enum(["off", "track", "context"]),
		progress_ms: z.number(),
		item: TrackSchema,

		// Added when passed from RecentlyPlayed
		is_previous: z.boolean(),
	})
	.partial({
		device: true,
		shuffle_state: true,
		repeat_state: true,
		is_previous: true,
	});

// Get Recently Played Tracks API
// Used as intermediary before
const SpotifyRecentlyPlayedSchema = z.object({
	items: z.array(
		z.object({
			track: TrackSchema,
		}),
	),
});

// Get User's Top Items - Artists
const SpotifyTopArtistsSchema = z.object({
	items: z.array(ArtistSchema),
	total: z.number(),
});

// Get User's Top Items - Tracks
const SpotifyTopTracksSchema = z.object({
	total: z.number(),
});

/*

Internal Type Inferencing

*/

export type PlaybackResponse = z.infer<typeof SpotifyPlaybackSchema>;

export type TopArtistsResponse = z.infer<typeof SpotifyTopArtistsSchema>;

export type TopTracksResponse = z.infer<typeof SpotifyTopTracksSchema>;

/*

Functions that call Spotify API

*/

// Returns the current playback
export async function GetPlayback() {
	try {
		const token = await SpotifyAccessToken();
		const response = await fetch("https://api.spotify.com/v1/me/player", {
			headers: {
				Authorization: "Bearer " + token,
			},
		});

		if (!response.ok) {
			return null;
		}
		if (response.status == 204) {
			return null;
		}

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const json = await response.json();
		// Json parsed here
		const parsed = SpotifyPlaybackSchema.parse(json);
		// Only return year for release date (looks cleaner)
		parsed.item.album.release_date =
			parsed.item.album.release_date.split("-")[0]!;

		return parsed;
	} catch (error) {
		console.log("Failed while getting playback: ", error);
	}
}

// Returns the most recently played song
export async function GetRecentlyPlayed() {
	try {
		const token = await SpotifyAccessToken();
		const response = await fetch(
			"https://api.spotify.com/v1/me/player/recently-played?limit=1",
			{
				headers: {
					Authorization: "Bearer " + token,
				},
			},
		);

		if (!response.ok) {
			return null;
		}
		if (response.status == 204) {
			return null;
		}

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const json = await response.json();
		// Json parsed here
		const parsed = SpotifyRecentlyPlayedSchema.parse(json);
		// Only return year for release date (looks cleaner)
		parsed.items[0]!.track.album.release_date =
			parsed.items[0]!.track.album.release_date.split("-")[0]!;

		// Convert Recently Played into Playback
		const converted = SpotifyPlaybackSchema.parse({
			is_playing: false,
			progress_ms: 0,
			item: parsed.items[0]!.track,
			is_previous: true,
		});

		return converted;
	} catch (error) {
		console.log("Failed while getting playback: ", error);
	}
}

export async function GetTopArtists() {
	try {
		const token = await SpotifyAccessToken();
		const response = await fetch(
			"https://api.spotify.com/v1/me/top/artists?limit=5",
			{
				headers: {
					Authorization: "Bearer " + token,
				},
			},
		);

		if (!response.ok) {
			return null;
		}
		if (response.status == 204) {
			return null;
		}

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const json = await response.json();
		// Json parsed here
		const parsed = SpotifyTopArtistsSchema.parse(json);

		return parsed;
	} catch (error) {
		console.log("Failed while getting statistics: ", error);
	}
}

export async function GetTotalTracks() {
	try {
		const token = await SpotifyAccessToken();
		const response = await fetch(
			"https://api.spotify.com/v1/me/top/tracks?limit=5",
			{
				headers: {
					Authorization: "Bearer " + token,
				},
			},
		);

		if (!response.ok) {
			return null;
		}
		if (response.status == 204) {
			return null;
		}

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const json = await response.json();
		// Json parsed here
		const parsed = SpotifyTopTracksSchema.parse(json);

		return parsed;
	} catch (error) {
		console.log("Failed while getting statistics: ", error);
	}
}

/*

Authentication Functions

*/

// Cryptographically secure types
function generateRandomString(length: number): string {
	const chars =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const randomArray = new Uint8Array(length);
	crypto.getRandomValues(randomArray);
	return Array.from(randomArray, (byte) => chars[byte % chars.length]).join("");
}

// Handle authenticating spotify account
export async function Authenticate() {
	const state = generateRandomString(16);
	const scopeArray = [
		"user-read-playback-state",
		"user-read-currently-playing",
		"user-modify-playback-state",
		"user-read-recently-played",
		"user-top-read",
	];

	const scope = scopeArray.join(" ");

	const url =
		"https://accounts.spotify.com/authorize?" +
		queryString.stringify({
			response_type: "code",
			client_id: env.SPOTIFY_CLIENT_ID,
			scope: scope,
			redirect_uri: env.SPOTIFY_REDIRECT_URL,
			state: state,
		});

	redirect(url);
}

// Exchange authorization for token, and save
export async function updateRefreshToken(code: string) {
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
	bodyParams.append("grant_type", "authorization_code");
	bodyParams.append("code", code);
	bodyParams.append("redirect_uri", env.SPOTIFY_REDIRECT_URL);

	try {
		const response = await fetch("https://accounts.spotify.com/api/token", {
			method: "POST",
			headers,
			body: bodyParams.toString(),
		});

		if (!response.ok) {
			throw new Error(`HTTP Error. Status: ${response.status}`);
		}

		// Always know what will be returned json
		// So we are fine with unknown type
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const data = await response.json();

		// Save refresh token
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		await redis.set<string>(
			"SPOTIFY_REFRESH_TOKEN",
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			data.refresh_token as string,
		);

		return;
	} catch (error) {
		console.log("Error: ", error);
		throw error;
	}
}

// Refresh spotify token for up to date token
export async function getAccessToken(refreshToken: string) {
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

		// Always know what will be returned json
		// So we are fine with unknown type
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const data = await response.json();
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		return data.access_token as string;
	} catch (error) {
		console.log("Error: ", error);
		throw error;
	}
}
