import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function Page() {
	return (
		<div className="min-h-screen bg-muted/30">
			<Header />
			<Body />
		</div>
	);
}

function Header() {
	return (
		<div className="mx-8 mt-16 flex flex-col space-y-1">
			<h1 className="font-semibold text-4xl underline decoration-primary">
				Software Engineering Internship
			</h1>
			<Link href="https://fstlogistics.com/" className="w-fit hover:underline">
				<h2 className="text-2xl">Outcomes</h2>
			</Link>
			<p className="">Mentored with Marcus Larger, Justin Holderby</p>
			<p className="font-light italic">April 15 - May 9, 2025</p>
		</div>
	);
}

function Body() {
	return (
		<>
			<div className="mx-8 mt-8 flex flex-col">
				<p className="max-w-5xl">
					My high school has a program called the Young Professionals Academy
					(YPA). The program gives students opportunities to partake in two
					internships. For my second, I spent 4-weeks with Outcomes. They are a
					tech company focused on pharmacy-centered software. My main mentors
					were Marcus Larger & Justin Holderby, but I also worked closely with
					several others within and outside of his team. It was an immensely
					valuable experience, seeing how my existing skills & knowledge
					transfer to software engineering in a business environment. Alongside
					that, I got insight into the business side of software, and the role
					of leadership.
				</p>
				<p className="my-2 max-w-5xl">
					I’ve already spent years writing code, and my mentors were aware of
					that, so the focus during this internship was to gain insight into the
					parts of software engineering I’m not privy to unless I am in the
					industry. It’s one thing to write code by yourself, or with a small
					team, and another with a team of other engineers, spanning multiple
					teams. I can’t include everything, so I will focus on the biggest
					take-aways.
				</p>
				<h3 className="font-semibold text-2xl">Code At Scale</h3>
				<p className="my-2 max-w-5xl">
					Speaking with the team at Outcomes, they gave me a high overview of
					the systems at the company. Everything is designed to be load balanced
					and highly available. It’s designed for a completely different purpose
					than a personal project. I was quoted that of the active codebases,
					there are over 50 million lines of code. It gave me an idea for why
					there are always so many engineers for one company. Working in a
					corporate environment is much different than personal (of course).
				</p>

				<h3 className="font-semibold text-2xl">AGILE Development</h3>
				<p className="my-2 max-w-5xl">
					Outcomes is a for profit company, and so they have become incredibly
					efficient with their time. My mentor went into incredible detail about
					AGILE for development, and I found it intriguing. He drew a diagram,
					so I did my best to recreate it.
				</p>
				<div className="relative my-2 aspect-video w-2xl">
					<Image
						src="/images/agile.png"
						alt="Diagram of agile"
						className="rounded"
						fill
					/>
				</div>
			</div>
		</>
	);
}
