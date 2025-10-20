/*
A universal adapter for audio servers if I change.
*/

// Define the data structures
interface Track {
  id: string;
  name: string;
  artist: string;
  album?: string;
  duration?: number;
}

interface Artist {
  id: string;
  name: string;
  genres?: string[];
  imageUrl?: string;
}

// Define the provider interface
interface MusicProvider {
  // Auth should be implicitly called by other functions.
  // Auth params should be passed in constructor
  authenticate(): Promise<boolean>;
  ensureAuthenticated(): Promise<void>;
  // Actual usage
  getTracks(limit?: number): Promise<Track[]>;
  getArtists(limit?: number): Promise<Artist[]>;
  getTopArtist(): Promise<Artist>;
}

/*
Implement the Tidal provider
*/

interface TidalAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface TidalCredentials {
  clientId: string;
  clientSecret: string;
}

// Implement the Tidal provider
class TidalMusicProvider implements MusicProvider {
  private token: string | null = null;
  private tokenExpiry: number | null = null;

  constructor(private credentials: TidalCredentials) {}

  // Implicitly called on use
  async authenticate(): Promise<boolean> {
    try {
      const credString = `${this.credentials.clientId}:${this.credentials.clientSecret}`;
      const base64Creds = Buffer.from(credString).toString("base64");

      const response = await fetch("https://auth.tidal.com/v1/oauth2/token", {
        method: "POST",
        headers: {
          Authorization: `Basic ${base64Creds}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
      });

      if (!response.ok) {
        return false;
      }

      const data: TidalAuthResponse = await response.json();
      this.token = data.access_token;
      this.tokenExpiry = Date.now() + data.expires_in * 1000;

      return true;
    } catch (error) {
      console.error("Authentication error:", error);
      return false;
    }
  }

  async ensureAuthenticated(): Promise<void> {
    if (!this.token || !this.tokenExpiry || Date.now() >= this.tokenExpiry) {
      const success = await this.authenticate();
      if (!success) {
        throw new Error("Failed to authenticate with Tidal");
      }
    }
  }

  async getTracks(limit: number = 20): Promise<Track[]> {
    await this.ensureAuthenticated();

    const response = await fetch(
      `https://openapi.tidal.com/tracks?limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch tracks: ${response.statusText}`);
    }

    return response.json();
  }

  async getArtists(limit: number = 20): Promise<Artist[]> {
    await this.ensureAuthenticated();

    const response = await fetch(
      `https://openapi.tidal.com/artists?limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch artists: ${response.statusText}`);
    }

    return response.json();
  }

  async getTopArtist(): Promise<Artist> {
    await this.ensureAuthenticated();

    const response = await fetch("https://openapi.tidal.com/artists/top", {
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch top artist: ${response.statusText}`);
    }

    return response.json();
  }
}
