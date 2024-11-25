"use client";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { CheckPasswordInput } from "./page";
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
      <div className="flex flex-col items-center">
        <h1 className="mt-64 text-7xl font-bold underline decoration-primary">
          My Letter.
        </h1>
        <h2 className="mt-4 text-5xl font-light">
          If you stumbled upon this page, you can close it.
        </h2>
        <h3 className="mt-32 text-3xl font-medium">
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
