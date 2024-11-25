import Link from "next/link";
import Image from "next/image";
import { Navbar } from "~/components/navbar";
import { utapi } from "~/server/uploadthing";

export default async function HomePage() {
  return (
    <main className="flex flex-col">
      <Navbar />
      <DisplayImages />
    </main>
  );
}

async function DisplayImages() {
  const images = (await utapi.listFiles()).files;

  return (
    <div className="mx-auto grid grid-cols-4 gap-4">
      {images.map((img, index) => (
        <Link
          key={img.key}
          href={"/photos/" + img.key}
          className="relative aspect-video h-64 rounded-xl ring-primary hover:border-2 hover:border-accent hover:ring-2"
        >
          <Image
            src={"https://utfs.io/a/dxgc3f8f0p/" + img.key}
            alt=""
            fill
            loading={index < 10 ? "eager" : "lazy"}
            className="rounded-xl shadow-md"
          />
        </Link>
      ))}
    </div>
  );
}
