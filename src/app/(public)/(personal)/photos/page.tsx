import Image from "next/image";
import Link from "next/link";
import { utapi } from "~/server/uploadthing";

export default async function HomePage() {
	return <DisplayImages />;
}

async function DisplayImages() {
	const images = (await utapi.listFiles()).files;

	return (
		<div className="mx-6 mt-16 mb-6 grid max-w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{images.map((img, index) => (
				<Link
					key={img.key}
					href={"/photos/" + img.key}
					className="relative aspect-video w-full rounded-xl ring-primary hover:border-2 hover:border-accent hover:ring-2 lg:h-64"
				>
					<Image
						src={"https://dxgc3f8f0p.ufs.sh/f/" + img.key}
						alt=""
						fill
						loading={index < 10 ? "eager" : "lazy"}
						className="rounded-xl drop-shadow-md"
					/>
				</Link>
			))}
		</div>
	);
}
