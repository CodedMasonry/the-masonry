"use server";

import { cookies } from "next/headers";
import { env } from "~/env";
import { CatchPage } from "./catchPage";

export default async function Page() {
  const cookieStore = await cookies();
  const key = cookieStore.get("key");

  if (key && key.value == env.PAGE_KEY) {
    return <div>Authenticated</div>;
  } else {
    return <CatchPage />;
  }
}
