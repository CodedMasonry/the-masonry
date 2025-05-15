import { db } from "~/server/db";
import { colleges } from "~/server/db/schema";

// TODO: Add when enough records to constitute numbers
export async function CollegeStats() {
  const entries = await db.select().from(colleges);

  return <div className="flex w-full items-center p-2">_</div>;
}
