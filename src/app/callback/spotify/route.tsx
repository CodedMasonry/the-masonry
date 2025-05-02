import { type NextRequest, NextResponse } from "next/server";
import { env } from "~/env";
import { Authenticate, updateRefreshToken } from "~/server/spotify";

export async function GET(request: NextRequest) {
	// Only allow on dev platform because unsafe
	if (!env.SPOTIFY_REDIRECT_URL.includes("localhost")) {
		return NextResponse.json(
			{ error: "Not Allowed In Production" },
			{ status: 403 },
		);
	}

	const query = request.nextUrl.searchParams;
	const code = query.get("code");

	if (code) {
		await updateRefreshToken(code);
		return NextResponse.json(
			{ error: "Success! You can close this tab" },
			{ status: 200 },
		);
	} else {
		// Send back to get authentication code
		await Authenticate();
	}

	return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}
