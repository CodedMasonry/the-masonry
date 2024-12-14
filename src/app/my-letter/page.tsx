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
          <br /> I never wanted to let you down or have you go, it&apos;s better
          off this way.
          <br />
          ...
          <br />
          What will it take to show you that it&apos;s not the life it seems?
          <br />
          I&apos;ve told you time and time again,
          <br />
          You sing the words, but don&apos;t know it means.
          <br />
          ...
          <br />
          You said you read me like a book,
          <br />
          but all the pages all are torn and frayed.
          <br />
          ...
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
          I Don&apos;t Want To Be Here Anymore
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
          I'm lost in my head.
        </p>
        <h2 className="pt-4 text-3xl font-bold underline decoration-primary md:text-4xl">
          Sleep
        </h2>
        <p>
          ...
          <br />
          Don't you breathe for me
          <br />
          Undeserving of your sympathy
          <br />
          'Cause there ain't no way that I'm sorry for what I did
          <br />
          And through it all
          <br />
          How could you cry for me?
          <br />
          'Cause I don't feel bad about it
          <br />
          So shut your eyes
          <br />
          Kiss me goodbye
          <br />
          And sleep
          <br />
          Just sleep
          <br />
        </p>
        <p>
          The hardest part
          <br />
          Is letting go of your dreams
          <br />
          A drink for the horror that I'm in
          <br />
          For the good guys and the bad guys
          <br />
          For the monsters that I've been
          <br />
          Three cheers for tyranny
          <br />
          Unapologetic apathy
          <br />
          'Cause there ain't no way that I'm coming back again
          <br />
          And through it all
          <br />
          How could you cry for me?
          <br />
          'Cause I don't feel bad about it
          <br />
          So shut your eyes
          <br />
          Kiss me goodbye
          <br />
          And sleep
          <br />
          Just sleep
          <br />
          ...
        </p>
        <h2 className="pt-4 text-3xl font-bold underline decoration-primary md:text-4xl">
          Better Off Dead
        </h2>
        <p>
          You won't remember the words I've said, but I'll remember yours, until
          my final breath.
        </p>
        <p className="pt-6">
          Brock Mason Shaffer,
          <br />
          December 14, 2024
        </p>
      </div>
    </main>
  );
}
