import Footer from "~/components/footer";
import { Navbar } from "~/components/navbar";
import Image from "next/image";
import Link from "next/link";

// Dublin green: #006853
export default async function Page() {
  return (
    <main className="flex flex-col">
      <Navbar />
      <Header />

      <Footer />
    </main>
  );
}

function Header() {
  return (
    <div className="ml-4 mr-4 mt-16 flex flex-col md:ml-8">
      <h1 className="text-5xl font-bold text-[#006853]">
        Young Professionals Academy
      </h1>
      <p className="mt-4 max-w-4xl text-lg">
        During my junior year in highschool I tried taking a program called IT
        Academy. I decided halfway through the semester that I knew the contents
        of the class, and decided to pick up Young Professionals Academy for my
        second semester. It was one of the greatest decisions I have made.
      </p>
    </div>
  );
}
