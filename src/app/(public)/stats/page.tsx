import { GetTopArtists, GetTopTracks } from "~/server/spotify";

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
  const topArtists = (await GetTopArtists()) ?? null;
  const topTracks = (await GetTopTracks()) ?? null;

  return (
    <div className="ml-8 mr-4 mt-28 flex flex-col md:ml-36 md:mt-32">
      <h3 className="text-3xl">Hello</h3>
    </div>
  );
}
