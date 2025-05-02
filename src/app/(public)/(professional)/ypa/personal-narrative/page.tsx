// Dublin green: #006853
export default async function Page() {
	return <Header />;
}

function Header() {
	return (
		<div className="mt-20 mr-4 ml-4 flex w-fit flex-col rounded-xl border-2 border-primary bg-muted p-4 md:ml-8">
			<h1 className="font-bold text-5xl text-primary">Personal Narrative</h1>
			<p className="mt-2 italic">Spring, 2025</p>
			<p className="mt-4 max-w-6xl text-lg">
				When I was younger my family didn’t want to pay for a babysitter, so
				they handed me an iPad. I Spent hours a day on that iPad; it started my
				journey into tech. In middle school my father gave me his old laptop,
				and I proceeded to spend hours a day on it instead. From gaming to
				writing code, it was a creative outlet. This laptop was the catalyst for
				my interest in technology, and to the point now where I have significant
				knowledge on nearly every aspect of it, and seen as a reliable source of
				information regarding technology.
			</p>
			<p className="mt-4 max-w-6xl text-lg">
				During my 8th grade year I received my first desktop computer. From
				choosing the parts: the cpu, the gpu, to the case, to the monitors; it
				was mine. Learning to build it expanded my knowledge greatly.
				Eventually, I learned to create games by taking leaked games and
				dissecting them, and trying to figure out how they worked. If something
				didn’t make sense, I would research it. Seeing real, in production code
				helped me understand the intricacies of coding, and improve my skills.
				It’s how I learn to this day. A lecture on writing doesn’t teach someone
				how to write, it’s repeated exposure to proper writing that does.
			</p>
			<p className="mt-4 max-w-6xl text-lg">
				I stumbled upon the exploiting community in middle school. People who
				would create code to gain an advantage in a game. What I learned early
				on is people in markets like that don’t act in good faith–it only took a
				few viruses to understand that. Going into high school, I shifted focus
				to ethical hacking, and eventually cybersecurity. Taking a cybersecurity
				academy reinforced that idea; however, knowing everything discussed in
				that class made it quite boring.
			</p>
			<p className="mt-4 max-w-6xl text-lg">
				I lost interest in programming for a year during my cybersecurity phase,
				but taking Computer Science A and surrounding myself with like minded
				people re-instilled that passion. Writing code taught me to have
				patience, continuously iterate, and strive to keep learning. I recently
				joined the robotics club to challenge myself further by working in a
				team, across multiple different disciplines. Down the line, I will use
				my technical skills and soft skills that I learn to eventually move to
				leadership positions to help other passionate people succeed at their
				goals.
			</p>
		</div>
	);
}
