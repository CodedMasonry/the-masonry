import { CloudinaryImage } from "@/components/CloudinaryImage"
import { cloudinaryAdmin } from "@/utils/cloudinary.server"
import { createFileRoute } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"

interface CloudinaryResource {
  public_id: string
  width: number
  height: number
}

export const getCloudinaryImages = createServerFn({
  method: "GET",
}).handler(async () => {
  try {
    const result = await cloudinaryAdmin.api.resources_by_asset_folder(
      "TheMasonry",
      {
        max_results: 50,
        resource_type: "image",
      }
    )

    return (result.resources as CloudinaryResource[]).map((img) => ({
      id: img.public_id,
      width: img.width,
      height: img.height,
    }))
  } catch (error) {
    console.error("Failed to fetch Cloudinary images:", error)
    throw new Error("Failed to load gallery data")
  }
})

export const Route = createFileRoute("/photos")({
  loader: () => getCloudinaryImages(),
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 15,
  component: RouteComponent,
})

function RouteComponent() {
  const images = Route.useLoaderData()

  return (
    <main className="min-h-screen w-full p-4">
      <h1 className="mb-6 px-1 text-3xl font-bold tracking-tight">
        Photo Gallery
      </h1>

      <div className="photo-gallery 3xl:columns-5 columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
        {images.map((img) => (
          <div
            key={img.id}
            className="photo-gallery-item mb-4 w-full break-inside-avoid overflow-hidden rounded-xl border border-border/40 bg-muted/40 transition-shadow duration-300 hover:shadow-lg"
          >
            <CloudinaryImage
              publicId={img.id}
              alt={`Gallery image ${img.id}`}
              aspectRatio={`${img.width}:${img.height}`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, (max-width: 1536px) 25vw, 16vw"
            />
          </div>
        ))}
      </div>
    </main>
  )
}
