import { IconChevronRight } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
	return (
		<>
			<Header />
		</>
	);
}

function Header() {
	return (
		<div className="mx-8 mt-16 flex max-w-4xl flex-col bg-muted/30">
			<h1 className="font-bold text-5xl text-primary drop-shadow-lg">
				Brock Shaffer
			</h1>
			<p className="font-light text-sm">
				contact@brockshaffer.dev (614) 595-6689
			</p>
			<p className="font-light text-sm">(614) 595-6689</p>
			<h2 className="mt-2 text-3xl underline decoration-primary">References</h2>
			<Reference
				name="Sarah Pearson"
				company="The Shaffer Group"
				phone="(614) 207-8670"
				email="sarah@sarahsells.net"
			>
				I currently work for Sarah and my father as a part of their real estate
				team. She can attest to my reliability, the resolve I possess for the
				work I do, and my flexibility both in terms of time management and
				application of my skills.
			</Reference>
			<Reference
				name="Kamaria Banks"
				company="FST Logistics"
				phone="(937) 301-0000"
				email="kamaria.banks@gmail.com"
			>
				A former mentor I had when I mentored with FST Logistics when I
				participated in a mentorship program. She can attest to my knowledge,
				and passion for everything I do. Alongside that, she can attest to my
				communication skills that I improved upon during that mentorship.
			</Reference>
			<Reference
				name="Braedon Young"
				company="Dublin City Schools"
				phone=""
				email="young_braedon@dublinschools.net"
			>
				Former Computer Science teacher I had, and one of my current robotics
				mentors that is ran through my highschool. He can attest to my
				programming skills as well as my ability to work in a team environment.
			</Reference>
			<Reference
				name="Andrew O'Brien"
				company="FST Logistics"
				phone=""
				email="aobrien@fstlogistics.com"
			>
				A former mentor I had during my mentorship with FST Logistics. He can
				also attest to the knowledge I know, the communication skills I have,
				and my willingness to keep learning. He taught me a ton about the work
				environment and what to expect. &quot;It doesn&apos;t matter if you have
				10+ years of experience; I can teach you the technical skills. What I
				can&apos;t teach you is how to speak to people.&quot;
			</Reference>
		</div>
	);
}

function Reference({
	name,
	company,
	phone,
	email,
	children,
}: {
	name: string;
	company: string;
	phone: string;
	email: string;
	children: React.ReactNode;
}) {
	return (
		<div className="mt-6">
			<h3 className="font-bold text-primary text-xl">{name}</h3>
			<p>{company}</p>
			<p>{phone}</p>
			<p>{email}</p>
			<p className="mt-2 max-w-3xl">{children}</p>
		</div>
	);
}
