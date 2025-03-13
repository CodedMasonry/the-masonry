/* eslint-disable react/no-unescaped-entities */
"use server";

import { cookies } from "next/headers";
import { env } from "~/env";
import { CatchPage } from "./catchPage";
import { GeistMono } from "geist/font/mono";
import React from "react";

export default async function Page() {
  const cookieStore = await cookies();
  const key = cookieStore.get("key");

  if (key && key.value == env.PAGE_KEY) {
    return <Letter />;
  } else {
    return <CatchPage />;
  }
}

function Letter() {
  return (
    <main className={`bg-background/50 ${GeistMono.variable}`}>
      <div className="flex max-w-4xl flex-col space-y-4 pb-8 pl-8 pr-8 pt-16 md:pl-16 md:pt-20 md:text-lg">
        <Entry id="1">Entry #1, Suicide Letter, December 14, 2024</Entry>
        <h1 className="text-4xl font-bold underline decoration-primary md:text-5xl">
          Given Up
        </h1>
        <p>
          There&apos;s so much I wish to say, so much I should say, yet nobody
          wants to hear that. I will keep it short by saying, if you&apos;re
          reading this, I&apos;ve decided to put a gun to my head, and kill
          myself on August 16, 2025. My body would have been found by Emergency
          Services near a boat dock by the Scioto River, just north of Dublin.
        </p>
        <p>
          That&apos;s all you really need to know, so you can stop here. I wish
          you a lovely evening / morning, and a remainder of your life.
        </p>
        <h2 className="pt-4 text-3xl font-bold underline decoration-primary md:text-4xl">
          I&apos;m Not Okay{" "}
          <span className="whitespace-nowrap">(I Promise)</span>
        </h2>
        <p>
          If you wanted honesty, that&apos;s all you had to say.
          <br />
          I never wanted to let you down or have you go, it&apos;s better off
          this way.
          <br />
          ...
          <br />
          I'm Not Okay,
          <br />
          I'm Not Okay,
          <br />
          I'm Not Okay,
          <br />
          You wear me out.
          <br />
          What will it take to show you that it&apos;s not the life it seems?
          <br />
          I&apos;ve told you time and time again,
          <br />
          You sing the words, but [still] don&apos;t know it means
          <br />
          To be a joke, and look, another line without a hook,
          <br />
          I held you close as we both shook,
          <br />
          For the last time, take a good hard look.
          <br />
          I'm Not Okay,
          <br />
          I'm Not Okay,
          <br />
          I'm Not Okay,
          <br />
          You wear me out.
          <br />
          ...
          <br />
          You said you read me like a book,
          <br />
          but all the pages all are torn and frayed.
          <br />
          I'm okay, I'm okay! I'm okay now (I'm okay now),
          <br />
          But you really need to listen to me,
          <br />
          because I&apos;m telling you the truth,
          <br />
          I mean this, I&apos;m Okay (Trust me),
          <br />
          I&apos;m not okay,
          <br />
          I&apos;m not okay,
          <br />
          Well, I&apos;m not okay,
          <br />
          I&apos;m not o-fucking-kay,
          <br />
          I&apos;m not okay,
          <br />
          I&apos;m not okay (okay).
        </p>
        <h2 className="pt-4 text-3xl font-bold underline decoration-primary md:text-4xl">
          Not Quite Myself
        </h2>
        <p>
          It's difficult to explain why I decided to kill myself, not that it
          matters to anyone beyond me. I'm just writing with no expectation of
          being heard.
        </p>
        <p>
          I've been struggling for years, and I just can't take it anymore. I
          don't want to see myself grow up, and look in the mirror and see the
          thing I abhor. I don't know what to do. I'm just stuck waiting and it
          destroys my confidence, my pride, my hope. For the past few years I've
          felt stuck waiting for something, anything. It's never just one thing
          that pushes someone over the cliff, they just only tell you the
          largest one.
        </p>
        <p>
          I'm screaming inside, with no idea what to do beyond ending it. It
          feels like the only reasonable option, the quickest, most painless
          one. The past two years have been the best moments of my life, I won't
          deny that. I have great friends, and to others a decent opportunity,
          yet I sabotage myself over and over. My Own Worst Enemy. I Weigh my
          inefficiencies higher than my achievements. The negatives shine
          brighter than the positives. I'm Lost. I don't know what to do. I
          can't get my mind to shut the fuck up.
        </p>
        <p>
          I don't deserve your time, your thoughts.
          <br />
          I don't deserve a venerated funeral, so please just cremate my corpse.
          <br />
          I don't deserve to live,
          <br />
          I don't deserve to think.
          <br />
          I'm Better Off Dead.
        </p>
        <p>
          <br />
          I don't feel like myself,
          <br />
          I don't feel safe,
          <br />
          I don't feel respected,
          <br />
          I don't feel heard.
          <br />
          I'm Better Off Dead.
        </p>
        <p>
          I'm not here to blame anyone for anything; I take full responsibilty
          for the choices I've made. I love the people in my life, but I just
          can't look in the mirror without wanting to put a bullet in that
          fucking idiot's head..
        </p>
        <h2 className="pt-4 text-3xl font-bold underline decoration-primary md:text-4xl">
          Sleep
        </h2>
        <p>
          ...
          <br />
          Some say now suffer all the childen
          <br />
          And walk away a savior,
          <br />
          Or a madman and polluted
          <br />
          From gutter institutions.
          <br />
          Don't you breathe for me,
          <br />
          Undeserving of your sympathy.
          <br />
          'Cause there ain't no way that I'm sorry for what I did,
          <br />
          And through it all,
          <br />
          How could you cry, for me?
          <br />
          'Cause I don't feel bad about it.
          <br />
          So shut your eyes,
          <br />
          Kiss me goodbye,
          <br />
          And sleep.
          <br />
          Just sleep.
          <br />
        </p>
        <p>
          The hardest part,
          <br />
          Is letting go of your dreams.
          <br />
          A drink for the horror that I'm in,
          <br />
          For the good guys and the bad guys,
          <br />
          For the monsters that I've been,
          <br />
          Three cheers for tyranny,
          <br />
          Unapologetic apathy,
          <br />
          'Cause there ain't no way that I'm coming back again.
          <br />
          And through it all,
          <br />
          How could you cry, for me?
          <br />
          'Cause I don't feel bad about it.
          <br />
          So shut your eyes,
          <br />
          Kiss me goodbye,
          <br />
          And sleep.
          <br />
          Just sleep.
          <br />
          ...
        </p>
        <h2 className="pt-4 text-3xl font-bold underline decoration-primary md:text-4xl">
          I Don&apos;t Want To Be Here Anymore
        </h2>
        <p>
          You won't remember the words I've said, but I'll remember yours, until
          my final breath.
          <br />
          <br />
          Brock Mason Shaffer,
          <br />
          December 14, 2024
        </p>
      </div>
      <div className="flex max-w-4xl flex-col space-y-4 pb-8 pl-8 pr-8 pt-16 md:pl-16 md:pt-20 md:text-lg">
        <Entry id="2">
          Entry #2, I Don't Know What To Do, December 29, 2024
        </Entry>
        <h1 className="text-4xl font-bold underline decoration-primary md:text-5xl">
          Angels With Dirty Faces
        </h1>
        <p>
          Waiting
          <br />
          ...
          <br />
          Waiting
          <br />
          ...
          <br />
          All I've done is{" "}
          <span className="text-2xl font-bold underline decoration-primary">
            wait.
          </span>
          <br />
          ...
          <br />
          I don't know what to do anymore. All I've felt like I have done for
          the past several years is just waiting. Waiting on others to complete
          a project, waiting on the next piece of work to do, waiting until I'm
          old enough to do anything, waiting until I get paid. It feels like
          anything I want to do requires just waiting. I feel adequate to work,
          yet I have to wait until I'm 18, let alone possess a redundant piece
          of paper attesting my loyalty & commitment, simply to get anywhere
          near a decent job. I just want to put a gun to my head. It will make
          time go so much faster. But I can't. I have to wait until I'm 18 just
          to cough up a significant portion of paper to gain a long-gun. If I
          want to do anything it is beyond my control, 90% of the time. I can't
          die, I can't get a good job, I just feel stuck.
          <br />
          <br />
          God, why does everything have to be so expensive? I need help, but I
          don't have the money for that. It cost on the low end, $200 dollars,
          for a something chambered in .22 LR. It cost at least $100 for a
          single session of therapy (It's never a single session). I find it
          easier to take the prior than the later, it's more reliable.
          <br />
          <br />
          "Your insurance can cover therapy" - no, it can't. Not sustainably.
          <br />
          "Your parents can cover therapy" - My family needs the money more than
          me.
          <br />
          "Aren't there better ways of dealing with this?" - I don't want drugs,
          that's worse.
          <br />
          <br />
          I'm just writing to myself. I'm going insane. God I hate this guy.
          Drown yourself at this point, I don't want to hear it. Jump off a
          bridge and make it quick. You've seen the state of your family, the
          medical conditions, the mental conditions. I don't want that. I don't
          want to suffer, I want a mercy kill. Slit my throat and let me
          suffocate on my own blood, it would be less painful then the fate that
          awaits me.
          <br />
          <br />
        </p>
        <h2 className="pt-4 text-3xl font-bold underline decoration-primary md:text-4xl">
          Numb, But I Still Feel It
        </h2>
        <p>
          ...I wish I could get over this feeling of slipping underline
          <br />
          I never get that far
          <br />
          Everything's so uncertain
          <br />
          Can't find the right direction
          <br />
          You look in the mirror and tell me you see clear
          <br />
          I see, I can see me, but I can't get past this feeling
          <br />
          I talk, but no one listens
          <br />
          Can't make my own decisions
          <br />
          ...
          <br />
          Every night I lie asleep
          <br />
          And try to wake up from this dream
          <br />
          Numb, but I still feel it crawling under my skin
          <br />
          I threw it all away, but it stills stays the same
          <br />
          Try and forget my name, but it's something I just can't change
          <br />
          I threw it all away, but it still stays the same.
          <br />
          ...
          <br />
          ...I wish I could get over this feeling of slipping under
          <br />I never get that far
        </p>
        <h2 className="pt-4 text-3xl font-bold underline decoration-primary md:text-4xl">
          Vampires Will Never Hurt You
        </h2>
        <p>
          I feel fractured & lost. One day I will be sane, content. The next, I
          just want to delete the save file. This mind just won't shut the fuck
          up, for a single moment. I could be doing so much with the time I
          have, yet I sit here with my thoughts being a fucking dumbass. You
          don't deserve success. Put the bullet in the skull, stop being a
          pussy. Be committal for once in your life. Your life is worthless,
          only the organs in your body are worth a dime.
          <br />
          <br />
          I write as if I expect anyone to read this, but know that isn't going
          to happen. I'd rather be forgotten than remembered for my
          imcompetence. I don't value my life, yet I want to enjoy it. At this
          point I'm just spiralling, I'm sorry if you chose to read this, I
          don't want you to read this, but I don't know what else to do. I don't
          know. I don't know what to do. I don't know what to say. I don't know
          how to fix it. I can't even look in the mirror with content for the
          man I see starring back. Nobody respects him, so why should I? He is
          subpar, he is imcompetent, he is inadequate, he is everything I
          despise. His name tattered and a perpetual reminder of all the stupid
          shit he's done.
          <br />
          <br />
          I'm sorry to those whom I've disappointed. I'm a pussy if I kill
          myself, and a pussy if I don't. I want to let the gun rest but I
          shakes in my had with keen intent, as thoughts flashing reminding me
          why it isn't worth living. For however good the future is, the past
          haunts me and the present taunts me with perpetual anxiety.
          <br />
          <br />
          I need help, please. Please save my soul. I act suicidial, that isn't
          a joke. If you hand me a gun, I will pull the trigger. This devil in
          my head goes away with that bullet; unfortunately, I'm taking myself
          with it.
          <br />
          <br />
          Brock Mason Shaffer,
          <br />
          December 29, 2024
        </p>
      </div>
    </main>
  );
}

function Entry({
  id,
  children,
}: Readonly<{
  id: string;
  children: React.ReactNode;
}>) {
  return (
    <div
      id={id}
      className="rounded border-2 border-destructive p-2 text-xs font-bold text-destructive"
    >
      {children}
    </div>
  );
}
