"use client";
import { IconChevronRight } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export default function SectionLearning() {
	return (
		<div className="mx-8 mt-28 flex flex-col md:mx-36 md:mt-36">
			<h3 className="md:-ml-4 mb-2 font-medium text-3xl underline decoration-primary drop-shadow-lg md:text-4xl">
				I Like To Learn
			</h3>
			<p className="mt-2 drop-shadow-lg md:text-lg">
				So I engage in opportunites that allow me to expand my knowledge.
			</p>
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
				<GridItem
					href="/ypa"
					image="/icons/ypa.png"
					title="Young Professional Academy"
					subtitle="Dublin City Schools"
				/>
				<GridItem
					href="/outcomes"
					image="/icons/outcomes.png"
					title="Software Engineering Internship"
					subtitle="Outcomes"
				/>
				<GridItem
					href="/fstlogistics"
					image="/icons/fst.jpeg"
					title="IT Department Internship"
					subtitle="FST Logistics"
				/>
			</div>
		</div>
	);
}

function GridItem({
	href,
	image,
	title,
	subtitle,
}: {
	href: string;
	image: string;
	title: string;
	subtitle: string;
}) {
	return (
		<Link
			href={href}
			className="hover:-translate-y-2 mt-4 flex flex-row rounded-xl border-2 border-transparent p-4 drop-shadow-lg transition hover:border-primary"
		>
			<Image
				src={image}
				width={112}
				height={112}
				alt=""
				className="my-auto aspect-square size-24 md:size-28"
			/>
			<div className="ml-4 flex w-full flex-col items-start border-foreground border-l-2 pl-4 align-middle transition">
				<h4 className="w-full font-semibold text-2xl md:text-3xl">{title}</h4>
				<p className="md:text-lg">{subtitle}</p>
				<IconChevronRight stroke={3} className="mt-auto mb-1 size-6 self-end" />
			</div>
		</Link>
	);
}
