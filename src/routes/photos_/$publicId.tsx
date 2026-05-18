import { createFileRoute, Link, notFound } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import { useState, useEffect, useRef } from "react"
import { z } from "zod"
import { v2 as cloudinary } from "cloudinary"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import PhotoActions from "@/components/PhotoActions"
import { CloudinaryImage } from "@/components/CloudinaryImage"
import { cn } from "@/lib/utils"
import {
  ApertureIcon,
  CalendarIcon,
  CameraIcon,
  ClockIcon,
  GearIcon,
  GlobeIcon,
  UserIcon,
} from "@phosphor-icons/react"

const CloudinaryMetadataSchema = z
  .object({
    make: z.string().optional(),
    model: z.string().optional(),
    focal_length: z.union([z.string(), z.number()]).optional(),
    aperture: z.union([z.string(), z.number()]).optional(),
    exposure_time: z.union([z.string(), z.number()]).optional(),
    iso: z.union([z.string(), z.number()]).optional(),
    CreateDate: z.string().optional(),
  })
  .catchall(z.any())

type CloudinaryMetadata = z.infer<typeof CloudinaryMetadataSchema>

const getPhotoDetails = createServerFn({ method: "GET" })
  .inputValidator(z.string())
  .handler(async ({ data: publicId }) => {
    const photo = await fallbackFetchLocalPhoto(publicId)

    if (!photo) {
      throw notFound()
    }

    let metadata: CloudinaryMetadata | null = null
    try {
      const result = await cloudinary.api.resource(photo.data.public_id, {
        media_metadata: true,
      })
      metadata = CloudinaryMetadataSchema.parse(result.media_metadata ?? null)
    } catch (err) {
      console.error(`Error fetching metadata for ${photo.data.public_id}`, err)
    }

    return { photo, metadata }
  })

export const Route = createFileRoute("/photos_/$publicId")({
  loader: async ({ params }) => {
    return await getPhotoDetails({ data: params.publicId })
  },
  component: PhotoDetailsPage,
})

function PhotoDetailsPage() {
  const { photo, metadata } = Route.useLoaderData()
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const img = container.querySelector("img")
    if (!img) return

    const reveal = () => setIsLoaded(true)

    if (img.complete && img.naturalHeight !== 0) {
      reveal()
    } else {
      img.addEventListener("load", reveal)
    }

    return () => img.removeEventListener("load", reveal)
  }, [])

  const createDateRaw = metadata?.CreateDate ?? photo.data.created_at
  let formattedDate = ""

  if (createDateRaw) {
    const isoString = createDateRaw.replace(
      /^(\d{4}):(\d{2}):(\d{2})/,
      "$1-$2-$3"
    )
    const dateObj = new Date(isoString)
    if (!isNaN(dateObj.getTime())) {
      formattedDate = dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    }
  }

  const metadataItems = [
    { key: "Make", label: "Camera Make", icon: CameraIcon },
    { key: "Model", label: "Camera Model", icon: CameraIcon },
    { key: "FocalLength", label: "Focal Length", icon: GearIcon },
    { key: "FNumber", label: "Aperture", icon: ApertureIcon },
    { key: "ExposureTime", label: "Exposure Time", icon: ClockIcon },
    { key: "ISO", label: "ISO", icon: GearIcon },
    { key: "GPSLatitude", label: "Latitude", icon: GlobeIcon },
    { key: "GPSLongitude", label: "Longitude", icon: GlobeIcon },
  ]

  return (
    <main className="flex min-h-screen flex-col">
      <Link
        to="/gallery"
        className="z-20 mt-4 mb-4 ml-2 cursor-default md:mb-0 xl:ml-8"
      >
        <Button variant="ghost">← Back to Gallery</Button>
      </Link>

      <div className="grid gap-4 pb-22 md:px-4 md:py-4 md:pb-4 xl:grid-cols-5 xl:px-8">
        <div
          ref={containerRef}
          className={cn(
            "relative aspect-video overflow-hidden transition-all duration-600 ease-in-out xl:col-span-4",
            isLoaded ? "scale-100 opacity-100" : "scale-[0.98] opacity-0"
          )}
        >
          <CloudinaryImage
            publicId={photo.data.public_id}
            alt={photo.data.display_name}
            aspectRatio="16:9"
            priority={true}
            className="photo-image h-full w-full md:rounded-lg"
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 80vw, 60vw"
          />
        </div>

        <div className="flex flex-col p-4">
          <h1 className="text-3xl font-bold">
            {photo.data.title ?? "Untitled"}
          </h1>
          <h2 className="mt-2 flex items-center gap-2 text-muted-foreground">
            <UserIcon className="size-4" />
            Photo by Brock Shaffer
          </h2>
          <h3 className="flex items-center gap-2 text-muted-foreground">
            <CalendarIcon className="size-4" />
            {metadata?.CreateDate !== undefined
              ? `Created ${formattedDate}`
              : `Uploaded ${formattedDate}`}
          </h3>

          <PhotoActions
            publicId={photo.data.public_id}
            format={photo.data.format}
          />

          <Separator className="my-6" />

          {metadata && (
            <div className="grid grid-cols-1 gap-4 text-sm text-muted-foreground">
              {metadataItems.map((item) =>
                metadata[item.key] ? (
                  <p key={item.key} className="flex items-center gap-2">
                    <item.icon className="size-4" />
                    <span>
                      {item.label}: {metadata[item.key]}
                    </span>
                  </p>
                ) : null
              )}
            </div>
          )}
        </div>
      </div>

      <div
        className={cn(
          "fixed right-0 bottom-0 left-0 z-50 h-1 bg-muted transition-opacity duration-300",
          isLoaded ? "pointer-events-none opacity-0" : "opacity-100"
        )}
      >
        <div className="h-full animate-[loadingPulse_1.5s_ease-in-out_infinite_alternate] bg-primary" />
      </div>
    </main>
  )
}

async function fallbackFetchLocalPhoto(publicId: string) {
  return {
    data: {
      public_id: publicId,
      display_name: "Untitled",
      title: "Untitled",
      format: "jpg",
      created_at: new Date().toISOString(),
    },
  }
}
