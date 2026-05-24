import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/scripts/$")({
  beforeLoad: () => {
    // Throw a redirect to push the user back to the main scripts index
    throw redirect({
      to: "/scripts",
      replace: true,
    })
  },
  component: () => null,
})
