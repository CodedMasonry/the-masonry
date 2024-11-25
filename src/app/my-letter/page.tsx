"use server";

import { cookies } from "next/headers";
import { env } from "~/env";
import { CatchPage } from "./catchPage";
import { redirect } from "next/navigation";

export default async function Page() {
  const cookieStore = await cookies();
  const key = cookieStore.get("key");

  if (key && key.value == env.PAGE_KEY) {
    return <div>Authenticated</div>;
  } else {
    return <CatchPage />;
  }
}

export async function CheckPasswordInput(_prevState: any, formData: FormData) {
  const cookieStore = await cookies();

  const pass = formData.get("password");

  // Set cookie with Password & refresh page else return error
  if (pass == env.PAGE_KEY) {
    cookieStore.set("key", env.PAGE_KEY);
    redirect("/my-letter");
  } else {
    return {
      message: "Invalid Password",
    };
  }
}
