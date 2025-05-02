import Image from "next/image";

export default function NotFound() {
	return (
		<div className="m-auto flex w-3/4 flex-col-reverse items-center justify-center text-center align-middle md:flex-row md:text-start">
			<div className="mr-4 flex flex-col space-y-2">
				<h2 className="font-bold text-6xl text-primary">404 Not Found</h2>
				<p className="max-w-xl text-lg">
					Huh. Something isn&apos;t right, how did you even get here? I&apos;m
					as lost as you are.
				</p>
			</div>
			<Image
				src="/drawings/notfound.svg"
				alt="unhappy guy looking at computer"
				className="dark:invert"
				width={256}
				height={256}
			/>
		</div>
	);
}
