import Image from "next/image";
import { ModeToggle } from "~/components/mode-toggle";

export default function HomePage() {
  return (
    <main className="flex">
      <Header />
    </main>
  );
}

function Header() {
  return (
    <div className="ml-36 mt-36 flex flex-row">
      <Image
        src="/dog.webp"
        alt=""
        width={384}
        height={384}
        className="aspect-square size-96 rounded-md border shadow-lg"
      />
      <div className="ml-8 mt-8 flex flex-col space-y-2">
        <h1 className="text-6xl font-extrabold text-primary drop-shadow-lg">
          Hello, I'm Brock.
        </h1>
        <h2 className="text-4xl drop-shadow-lg">Software Developer</h2>
        <p className="max-w-3xl drop-shadow-lg">
          I'm a high school student from Columbus, Ohio with years of
          programming experience, focusing on network programming, and malware
          development. Having a diverse skill set in these areas gives me a
          well-rounded understanding of the cybersecurity landscape. I'm also
          passionate about bridging the gap between the technical and business
          aspects of technology, emphasizing clear communication and
          collaboration to push results.
        </p>
        <div className="flex space-x-4">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
