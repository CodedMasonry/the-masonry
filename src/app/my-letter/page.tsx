import { cookies } from "next/headers";
import * as crypto from "crypto";
import { env } from "~/env";

export default async function Page() {
  const cookieStore = await cookies();
  const key = cookieStore.get("key");

  const pass = await Bun.password.hash(env.PAGE_KEY, {
    algorithm: "bcrypt"
  });

  if (key && key.value == ) {
  } else {
  }
}
