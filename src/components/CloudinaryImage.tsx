import {
  AdvancedImage,
  responsive,
  lazyload,
  placeholder,
} from "@cloudinary/react"
import { fill } from "@cloudinary/url-gen/actions/resize"
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity"
import { cld } from "../utils/cloudinary"

interface ImageProps {
  publicId: string
  alt: string
  aspectRatio?: string // "16:9" or "21:9" etc.
  priority?: boolean
  className?: string
  wrapperClassName?: string
  wrapperRef?: React.RefObject<HTMLDivElement | null>
}

export function CloudinaryImage({
  publicId,
  alt,
  aspectRatio,
  priority = false,
  className,
  wrapperClassName,
  wrapperRef,
}: ImageProps) {
  const myImage = cld.image(publicId)

  myImage.format("auto").quality("auto")

  // Only set a max-resolution crop — the responsive plugin handles
  // actual sizing. Cap at 2560px wide so we never fetch a giant master.
  if (aspectRatio) {
    const [w, h] = aspectRatio.split(":").map(Number)
    const MAX_W = 2560
    const MAX_H = Math.round((h / w) * MAX_W)
    myImage.resize(fill().width(MAX_W).height(MAX_H).gravity(autoGravity()))
  }

  const plugins = priority
    ? [
        // Priority images: responsive sizing only, no lazy/placeholder
        responsive({ steps: [320, 640, 768, 1024, 1280, 1536, 1920, 2560] }),
      ]
    : [
        lazyload({ rootMargin: "200px 0px" }),
        placeholder({ mode: "pixelate" }),
        responsive({ steps: [320, 640, 768, 1024, 1280, 1536, 1920, 2560] }),
      ]

  return (
    // Outer wrapper: reserves space via aspect-ratio to eliminate CLS
    <div
      ref={wrapperRef}
      className={wrapperClassName}
      style={
        aspectRatio
          ? {
              position: "relative",
              width: "100%",
              aspectRatio: aspectRatio.replace(":", " / "),
            }
          : undefined
      }
    >
      <AdvancedImage
        cldImg={myImage}
        alt={alt}
        plugins={plugins}
        attr={{
          loading: priority ? "eager" : "lazy",
          fetchpriority: priority ? "high" : "auto",
          decoding: priority ? "sync" : "async",
          // responsive plugin writes srcset; this is the fallback size hint
          sizes: [
            "(max-width: 640px) 100vw",
            "(max-width: 1024px) 90vw",
            "75vw",
          ].join(", "),
        }}
        className={className}
      />
    </div>
  )
}
