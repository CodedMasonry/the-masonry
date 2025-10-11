import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";

export const Route = createFileRoute("/resume")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col">
      <div className="mx-auto px-8 md:px-4 my-4 aspect-auto">
        <img src="/resume.png" alt="Resume" className="drop-shadow-lg" />
      </div>
      <a
        className="mx-auto my-8 flex w-fit items-center rounded-md border-2 border-primary px-4 py-2 align-middle text-primary drop-shadow-lg transition-all duration-150 hover:bg-primary hover:text-primary-foreground"
        href="/resume.pdf"
        download="Brock_Shaffer.pdf"
      >
        Download PDF <Download className="ml-1 size-5" />
      </a>
    </div>
  );
}
