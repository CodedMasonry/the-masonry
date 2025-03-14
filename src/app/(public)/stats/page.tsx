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
    </div>
  );
}

async function SectionSpotify() {
  const { topArtists, topTracks } = await api.spotify.getTopItems();

  console.log(topArtists?.total);

  return (
    <div className="ml-8 mr-4 mt-28 flex flex-col md:ml-36 md:mt-32">
      <h3 className="flex items-center align-middle text-4xl font-bold">
        <Image
          src="/icons/spotify_mark.png"
          alt=""
          className="mr-2 size-12"
          width={48}
          height={48}
        />
        Spotify
      </h3>
      <p className="mt-4 text-4xl">
        I have listened <span>{topTracks?.total} unique tracks</span> across{" "}
        <span>{topArtists?.total} different artists</span>.
      </p>
    </div>
  );
}
