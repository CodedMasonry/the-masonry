import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="mt-32 flex flex-row bg-background p-6">
      <Link
        href="mailto:contact@brockshaffer.dev"
        className="flex items-center text-2xl hover:underline"
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
