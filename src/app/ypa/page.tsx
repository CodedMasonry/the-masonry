import Footer from "~/components/footer";
import { Navbar } from "~/components/navbar";

export default async function Page() {
  return (
    <main className="flex flex-col">
      <Navbar />

      <Footer />
    </main>
  );
}
