import dynamic from "next/dynamic";
import Image from "next/image";
import { CycleText, StaggerButtons } from "~/app/client";
import { Navbar } from "~/components/navbar";

export default async function HomePage() {
  return (
    <main className="flex flex-col">
      <Navbar />
      <Header />
      <Spotify />
    </main>
  );
}

function Header() {
  return (
    <div className="ml-36 mt-28 flex flex-row">
      <Image
        src="/dog.webp"
        alt=""
        width={384}
        height={384}
        className="aspect-square size-96 rounded-md border shadow-lg"
      />
      <div className="ml-8 mt-8 flex flex-col space-y-2">
        <h1
          className="text-6xl font-extrabold text-primary drop-shadow-lg"
          id="name"
        >
          Hello, I'm Brock.
        </h1>
        <h2 className="text-4xl drop-shadow-lg">
          <CycleText
            options={[
              "Software Developer",
              "Cybersecurity Enthusiast",
              "Photographer",
              "Drone Pilot",
            ]}
          />
        </h2>
        <p className="max-w-3xl pb-4 pt-4 drop-shadow-lg">
          I'm a high school student from Columbus, Ohio with several years of
          programming experience, focusing on network programming, and Backend
          development. I'm passionate about bridging the gap between the
          technical and business aspects of technology, emphasizing clear
          communication and collaboration to push results.
        </p>
        <StaggerButtons />
      </div>
    </div>
  );
}

// Lazy load Client Section
const SpotifyClientSection = dynamic(() =>
  import("~/app/client").then((mod) => mod.SpotifyClientSection),
);

function Spotify() {
  return (
    <div className="mb-32 ml-36 mt-32 flex flex-col">
      <h3 className="-ml-4 mb-4 text-3xl underline decoration-primary">
        I listen to a decent amount of music.
      </h3>
      <div className="h-96">
        <SpotifyClientSection />
      </div>
    </div>
  );
}
