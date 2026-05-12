import { AdvancedImage, responsive, placeholder } from "@cloudinary/react"
import { fill } from "@cloudinary/url-gen/actions/resize"
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity"
import { cld } from "../utils/cloudinary"

interface ImageProps {
  publicId: string
  alt: string
  aspectRatio?: string // "16:9" or "1:1"
  priority?: boolean
  className?: string
}

export function CloudinaryImage({
  publicId,
  alt,
  aspectRatio,
  priority = false,
  className,
}: ImageProps) {
  const myImage = cld.image(publicId)

  myImage.format("auto").quality("auto")

  if (aspectRatio) {
    const [width, height] = aspectRatio.split(":").map(Number)
    myImage.resize(
      fill()
        .width(width * 100)
        .height(height * 100)
        .gravity(autoGravity())
    )
  }
  console.log(myImage.toURL())

  return (
    <AdvancedImage
      cldImg={myImage}
      alt={alt}
      attr={{
        loading: priority ? "eager" : "lazy",
        fetchpriority: priority ? "high" : "auto",
      }}
      plugins={[
        responsive({ steps: [640, 768, 1024, 1280] }),
        placeholder({ mode: "pixelate" }),
      ]}
      className={className}
    />
  )
}
