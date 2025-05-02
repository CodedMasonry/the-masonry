import { IconDownload } from "@tabler/icons-react";
import Image from "next/image";

export default function page() {
	return (
		<>
			<div className="relative mx-2 aspect-auto h-svh md:mt-16">
				<Image
					src="/resume.png"
					alt="Resume"
					fill
					unoptimized
					style={{ objectFit: "contain" }}
					className="drop-shadow-lg"
				/>
			</div>
			<a
				className="mx-auto my-4 flex w-fit items-center rounded-md border-2 border-primary px-4 py-2 align-middle text-primary drop-shadow-lg transition-all duration-150 hover:bg-primary hover:text-primary-foreground"
				href="/resume.pdf"
				download="Brock_Shaffer.pdf"
			>
				Download PDF <IconDownload className="ml-1 size-5" />
			</a>
		</>
	);
}
