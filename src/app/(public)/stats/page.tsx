import { IconExplicit, IconExternalLink } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
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

// Spotify Color #1ED760
async function SectionSpotify() {
  const { topArtists, topTracks } = await api.spotify.getTopItems();

  return (
    <div className="mx-8 mt-28 flex flex-col md:mx-36 md:mt-32">
      <h3 className="flex items-center align-middle text-4xl font-bold drop-shadow-md">
        <Image
          src="/icons/spotify_mark.svg"
          alt=""
          className="mr-2 size-12"
          width={48}
          height={48}
        />
        Spotify
      </h3>
      <p className="mt-4 inline items-center text-3xl font-light drop-shadow-lg md:text-4xl">
        I have listened to
        <span className="mx-2 text-primary drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]">
          {topTracks?.total} unique tracks
        </span>
        from over
        <span className="mx-2 text-[#1ED760] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]">
          {topArtists?.total} different artists
        </span>
      </p>
      <h4 className="mt-8 text-3xl font-semibold underline decoration-[#1ED760] drop-shadow-lg">
        Favorite Artists
      </h4>
      <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {topArtists?.items.map((key, index) => (
          <TopArtist
            key={key.name}
            pos={index}
            name={key.name}
            image={key.images[0]?.url ?? ""}
            url={key.external_urls.spotify}
            genres={key.genres}
          />
        ))}
      </div>
    </div>
  );
}

function TopArtist({
  pos,
  name,
  image,
  url,
  genres,
}: {
  pos: number;
  name: string;
  image: string;
  url: string;
  genres: string[];
}) {
  return (
    <Link
      href={url}
      className="group relative cursor-default rounded-xl bg-secondary shadow-lg ring-2 ring-transparent transition-all hover:ring-primary"
    >
      <div className="relative aspect-square">
        <p className="absolute z-50 p-1 font-semibold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          #{pos + 1}
        </p>
        <Image
          src={image}
          alt=""
          fill
          unoptimized
          className="absolute z-10 rounded-t-xl"
        />
      </div>
      <div className="rounded-b-xl p-1">
        <p className="font-semibold text-secondary-foreground drop-shadow-lg">
          {name}
        </p>
        <p className="mt-auto text-sm font-light text-secondary-foreground drop-shadow-lg">
          {genres.slice(0, 3).join(", ")}
        </p>
      </div>
      <IconExternalLink className="absolute bottom-2 right-2 z-20 translate-y-2 stroke-primary opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100" />
    </Link>
  );
}
