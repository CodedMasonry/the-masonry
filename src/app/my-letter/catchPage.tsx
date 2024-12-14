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
      <div className="ml-4 mr-4 flex flex-col items-center mb-6">
        <h1 className="mt-48 text-6xl font-bold underline decoration-primary md:mt-64 md:text-7xl">
          My Letter.
        </h1>
        <h2 className="mt-4 text-4xl font-light md:text-5xl">
          If you stumbled upon this page, you can close it.
        </h2>
        <h3 className="mt-32 text-2xl font-medium md:text-3xl">
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
