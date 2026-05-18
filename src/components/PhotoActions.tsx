"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { CheckIcon, DownloadIcon, LinkIcon } from "@phosphor-icons/react"
import { useState } from "react"

interface PhotoActionsProps {
  publicId: string
  format?: string
}

export default function PhotoActions({ publicId, format }: PhotoActionsProps) {
  const [copied, setCopied] = useState(false)

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME

  if (!publicId) return null

  const buildUrl = (targetFormat?: string, asAttachment: boolean = true) => {
    const parts = ["image", "upload"]
    const flags = []

    if (asAttachment) {
      flags.push("fl_attachment")
    }

    if (targetFormat && targetFormat !== "original") {
      flags.push(`f_${targetFormat}`)
    }

    if (flags.length > 0) {
      parts.push(flags.join(","))
    }

    parts.push(publicId)

    return `https://res.cloudinary.com/${cloudName}/${parts.join("/")}`
  }

  const formatLabels: Record<string, string> = {
    jpg: "JPEG (Most Compatible)",
    png: "PNG (Lossless)",
    webp: "WEBP (High Efficiency)",
    original: `Original (${format?.toUpperCase() ?? "Master"})`,
  }

  const safeFormats = ["jpg", "png", "webp"]
  const dropdownOptions = [...safeFormats]

  if (format && !safeFormats.includes(format.toLowerCase())) {
    dropdownOptions.push("original")
  }

  const triggerDownload = (formatChoice: string) => {
    const hasTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        (navigator as any).msMaxTouchPoints > 0)

    const isMobile = hasTouch && window.matchMedia("(max-width: 768px)").matches

    if (isMobile) {
      const url = buildUrl(formatChoice, false)
      window.open(url, "_blank", "noopener,noreferrer")
    } else {
      const url = buildUrl(formatChoice, true)
      const a = document.createElement("a")
      a.href = url
      a.download = ""
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  const handleCopy = async () => {
    try {
      const publicViewUrl = buildUrl(undefined, false)
      await navigator.clipboard.writeText(publicViewUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Copy failed:", error)
    }
  }

  return (
    <div className="mt-6 flex flex-row gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button className="items-center">
            <DownloadIcon className="size-5" /> Download
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {dropdownOptions.map((opt) => (
            <DropdownMenuItem key={opt} onClick={() => triggerDownload(opt)}>
              {formatLabels[opt] ?? opt.toUpperCase()}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button onClick={handleCopy} variant="ghost" className="items-center">
        {copied ? (
          <CheckIcon className="size-5" />
        ) : (
          <LinkIcon className="size-5" />
        )}
        {copied ? "Copied!" : "Copy Link"}
      </Button>
    </div>
  )
}
