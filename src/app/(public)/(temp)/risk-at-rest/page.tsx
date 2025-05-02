import { IconDownload } from "@tabler/icons-react";
import Image from "next/image";

export default function page() {
	return (
		<>
			<div className="relative h-svh w-full md:mt-16">
				<iframe src="/risk-at-rest.pdf" className="h-svh w-full" />
			</div>
		</>
	);
}
