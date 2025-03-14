import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="mt-16 flex flex-row bg-background p-4 align-middle md:p-6">
      <Link
        href="mailto:contact@brockshaffer.dev"
        className="flex items-center text-lg hover:underline md:text-2xl"
      >
        <Image
          src="/favicon.svg"
          alt=""
          width={32}
          height={32}
          className="mr-4"
        />
        contact@brockshaffer.dev
      </Link>
    </div>
  );
}
