import Image from "next/image";
import { api } from "~/trpc/server";

export default function page() {
  return (
    <>
      <Header />
      <SectionSpotify />
    </>
  );
}

async function Header() {
  return (
    <div className="ml-8 mr-4 mt-12 flex flex-col space-y-2 md:ml-36 md:mt-32">
      <h1 className="text-5xl font-extrabold text-primary drop-shadow-lg md:text-6xl">
        Some Statistics
      </h1>
      <h2 className="my-2 text-3xl underline decoration-primary drop-shadow-lg">
        Because I like numbers
      </h2>
      <p className="drop-shadow-lg md:max-w-3xl md:pt-4">
        These numbers are either pulled from APIs or personal databases, and
        update automatically.
      </p>
    </div>
  );
}

async function SectionSpotify() {
  const { topArtists, topTracks } = await api.spotify.getTopItems();

  return (
    <div className="ml-8 mr-4 mt-28 flex flex-col md:ml-36 md:mt-32">
      <h3 className="flex items-center align-middle text-4xl font-bold drop-shadow-lg">
        <Image
          src="/icons/spotify_mark.png"
          alt=""
          className="mr-2 size-12"
          width={48}
          height={48}
        />
        Spotify
      </h3>
      <p className="mt-4 inline items-center text-4xl drop-shadow-lg md:text-5xl">
        I have listened to
        <span className="mx-2 text-chart-1">
          {topTracks?.total} unique tracks
        </span>
        from over
        <span className="mx-2 text-chart-2">
          {topArtists?.total} different artists
        </span>
      </p>
      <div>
        <TopArtist></TopArtist>
      </div>
    </div>
  );
}

function TopArtist() {
  return <div></div>;
}
