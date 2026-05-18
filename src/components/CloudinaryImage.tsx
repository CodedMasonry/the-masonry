import {
  AdvancedImage,
  responsive,
  lazyload,
  placeholder,
} from "@cloudinary/react"
import { fill } from "@cloudinary/url-gen/actions/resize"
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity"
import { cld } from "../utils/cloudinary"
import { cn } from "@/lib/utils"

interface ImageProps {
  publicId: string
  alt: string
  aspectRatio?: string
  priority?: boolean
  className?: string
  wrapperClassName?: string
  wrapperRef?: React.RefObject<HTMLDivElement | null>
  sizes?: string
}

export function CloudinaryImage({
  publicId,
  alt,
  aspectRatio,
  priority = false,
  className,
  wrapperClassName,
  wrapperRef,
  sizes,
}: ImageProps) {
  const myImage = cld.image(publicId)
  myImage.format("auto").quality("auto")

  if (aspectRatio) {
    const [w, h] = aspectRatio.split(":").map(Number)
    const MAX_W = 2560
    const MAX_H = Math.round((h / w) * MAX_W)
    myImage.resize(fill().width(MAX_W).height(MAX_H).gravity(autoGravity()))
  }

  const plugins = priority
    ? [responsive({ steps: [320, 640, 768, 1024, 1280, 1536, 1920, 2560] })]
    : [
        lazyload({ rootMargin: "200px 0px" }),
        placeholder({ mode: "pixelate" }),
        responsive({ steps: [320, 640, 768, 1024, 1280, 1536, 1920, 2560] }),
      ]

  const wrapperStyle: React.CSSProperties = aspectRatio
    ? {
        position: "relative",
        width: "100%",
        aspectRatio: aspectRatio.replace(":", " / "),
      }
    : {
        width: "100%",
        display: "block",
      }

  const finalSizes =
    sizes ||
    ["(max-width: 640px) 100vw", "(max-width: 1024px) 90vw", "75vw"].join(", ")

  return (
    <div ref={wrapperRef} className={wrapperClassName} style={wrapperStyle}>
      <AdvancedImage
        cldImg={myImage}
        alt={alt}
        plugins={plugins}
        className={cn("block h-auto w-full", className)}
        attr={{
          loading: priority ? "eager" : "lazy",
          fetchpriority: priority ? "high" : "auto",
          decoding: priority ? "sync" : "async",
          sizes: finalSizes,
        }}
      />
    </div>
  )
}
