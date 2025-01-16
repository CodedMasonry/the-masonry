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
    <main
      className={`m-10 flex max-w-4xl flex-col space-y-4 ${GeistMono.variable}`}
    >
      x
    </main>
  );
}