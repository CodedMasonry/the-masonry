"use server";

import { redirect } from "next/navigation";
import { createHmac } from "crypto";
import { cookies } from "next/headers";
import { env } from "~/env";

export async function CheckPasswordInput(
  _prevState: unknown,
  formData: FormData,
) {
  const cookieStore = await cookies();
  const hasher = createHmac("sha256", "mcr");

  const pass = formData.get("password");
  if (!pass) {
    return {
      message: "No Password Sent",
    };
  }

  hasher.update(pass.slice(0, pass.length).toString());
  const data = hasher.digest("hex");
  console.log(data);

  // Set cookie with Password & refresh page else return error
  if (data == env.PAGE_KEY) {
    cookieStore.set("key", env.PAGE_KEY);
    redirect("/my-letter");
  } else {
    return {
      message: "Invalid Password",
    };
  }
}
