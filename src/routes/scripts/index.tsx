import { createFileRoute, Link } from "@tanstack/react-router"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { ArrowRightIcon, FileIcon, GridNineIcon } from "@phosphor-icons/react"

export const Route = createFileRoute("/scripts/")({
  component: ScriptsDirectoryPage,
})

const SCRIPTS = [
  {
    title: "Image Format Converter",
    description:
      "Convert your images to PNG, JPEG, or WebP format (including HEIC/HEIF).",
    href: "/scripts/image-convert",
    icon: FileIcon,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Contact Sheet Creator",
    description: "Generate a beautiful 4×3 contact sheet from up to 12 images.",
    href: "/scripts/contact-sheet",
    icon: GridNineIcon,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
]

export default function ScriptsDirectoryPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto max-w-5xl px-4 py-12">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold text-balance md:text-5xl">
            Tools & Scripts
          </h1>
          <p className="max-w-2xl text-lg text-balance text-muted-foreground">
            A collection of in-browser utilities and tools. Everything runs
            locally in your browser for maximum privacy and speed.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SCRIPTS.map((script) => (
            <Link
              key={script.href}
              to={script.href}
              className="group rounded-xl focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none"
            >
              <Card className="h-full border border-border bg-card transition-colors duration-200 hover:bg-muted/50">
                <CardHeader>
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${script.bgColor}`}
                  >
                    <script.icon className={`h-6 w-6 ${script.color}`} />
                  </div>
                  <CardTitle className="flex items-center justify-between text-xl transition-colors group-hover:text-primary">
                    {script.title}
                    <ArrowRightIcon className="h-5 w-5 -translate-x-2 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </CardTitle>
                  <CardDescription className="mt-2 text-sm leading-relaxed">
                    {script.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
