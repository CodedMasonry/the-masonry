export default async function Page() {
  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <SkillOne />
      <SkillTwo />
      <SkillThree />
      <SkillFour />
      <SkillFive />
    </div>
  );
}

function Header() {
  return (
    <div className="mx-8 mt-16 flex flex-col space-y-1">
      <h1 className="text-4xl font-bold underline decoration-primary">
        StrengthFinder Assessment
      </h1>
      <h2 className="text-lg">
        I completed this assessment in the spring of 2025 to gain insight on
        some of my strengths.
      </h2>
    </div>
  );
}

function SkillOne() {
  return (
    <div className="mx-8 mt-8 flex flex-col">
      <h3 className="text-3xl font-semibold text-green-600">1) Analytical</h3>
      <p className="max-w-4xl">
        According to StrengthFinder, Analytical people search for reasons and
        causes, and have the innate ability to think about all of the factors
        that might affect a situation. This is bolstered when I write code, or
        solve an engineering problem. Understanding how everything is intended
        to work at a macro level helps me understand how minute details play a
        part in the macro level. Take this page for example. The
        <span className="inline font-bold text-primary"> colors </span>are
        intentional to reflect the theme of my website, as well as tie in the
        <span className="inline font-bold text-green-600"> color coding </span>
        employed by StrengthFinders so anyone familiar with it can quickly
        associate it with macro concepts. Everything is intentional, and thought
        out.
      </p>
    </div>
  );
}

function SkillTwo() {
  return (
    <div className="mx-8 mt-8 flex flex-col">
      <h3 className="text-3xl font-semibold text-purple-600">2) Arranger</h3>
      <p className="max-w-4xl">
        As said by StrengthFinders,when faced with a complex situation involving
        many factors, someone who is an Arranger enjoys managing all of the
        variables, changing them until they are sure they have arranged
        everything in the most productive way. A fantastic example of this is
        how I work for my father. One day I will have nothing to do, the next I
        might have half a dozen tasks. Planning my availability around what
        needs to be done, how quickly I can get it done has become second nature
        to me.
      </p>
    </div>
  );
}

function SkillThree() {
  return (
    <div className="mx-8 mt-8 flex flex-col">
      <h3 className="text-3xl font-semibold text-purple-600">3) Restorative</h3>
      <p className="max-w-4xl">
        People who are Restorative love to solve problems. They are good at
        figuring out what is wrong and resolving it. When I was younger, I
        learned to write code by reverse engineering existing codebases. Making
        dysfunctional code work for me was invigorating, and I carry that
        passion for any work I do. People mention problems to me and I
        immediately start thinking about potential solutions. As I would say,
        it&apos;s the engineering mentality to find a solution.
      </p>
    </div>
  );
}

function SkillFour() {
  return (
    <div className="mx-8 mt-8 flex flex-col">
      <h3 className="text-3xl font-semibold text-blue-600">4) Developer</h3>
      <p className="max-w-4xl">
        As a developer, they can see the potential in others, and in their view
        no individual is fully formed. They believe there is potential in
        everyone, and room for them to grow. I hold this idea closely. I am
        aware there is so much more I can learn, and strive to keep learning new
        things. I surround myself with incredible people who are incredibly
        talented to keep growing myself. I encourage others to do the same, and
        love helping others find the best way to grow themselves. There is no
        ‘winning’ in knowledge, just a continuous climb upwards. A well rounded
        person needs to embrace that.
      </p>
    </div>
  );
}

function SkillFive() {
  return (
    <div className="mx-8 mt-8 flex flex-col">
      <h3 className="text-3xl font-semibold text-green-600">5) Futuristic</h3>
      <p className="max-w-4xl">
        Quoting StrengthsFinder directly, &quot;You are inspired by the future
        and what could be. You energize others with your visions of the future
        &quot;. This idea perfectly encapsulates the view I take on the world.
        The short term pains may hurt now, but the long term goals are what I
        keep my focus on. Engaging in mentorships may show little in the short
        term, are valuable in the long term as stepping stones for my future. A
        non-professional example would be with running. It physically hurts me
        to run, but afterwards I feel amazing.
      </p>
    </div>
  );
}
