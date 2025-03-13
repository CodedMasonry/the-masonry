"use client";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { CheckPasswordInput } from "./Validation";
import { useActionState } from "react";
import { Navbar } from "~/components/navbar";

const initialState = {
  message: "",
};

export function CatchPage() {
  const [state, formAction] = useActionState(CheckPasswordInput, initialState);

  return (
    <main className="flex flex-col">
      <Navbar />
      <div className="mb-6 ml-4 mr-4 flex flex-col items-center">
        <h1 className="mt-16 text-6xl font-bold underline decoration-primary md:mt-64 md:text-7xl">
          My Letter
        </h1>
        <h2 className="mt-4 text-center text-3xl font-light md:text-start md:text-4xl">
          If you stumbled upon this page, you can close it.
        </h2>
        <h3 className="mt-16 text-center text-xl font-medium md:mt-32 md:text-start md:text-2xl">
          If I sent you the password, Please enter it below.
        </h3>
        <form
          action={formAction}
          className="mt-4 flex max-w-sm flex-row items-center space-x-2"
        >
          <Input name="password" placeholder="Password" required />
          <Button>Submit</Button>
        </form>
        <p aria-live="polite" className="text-destructive">
          {state?.message}
        </p>
      </div>
    </main>
  );
}
