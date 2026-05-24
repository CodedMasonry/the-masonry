import { createFileRoute } from "@tanstack/react-router"
import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export const Route = createFileRoute("/scripts/image-convert")({
  component: ImageFormatConverterPage,
})

type ImageFormat = "png" | "jpeg" | "webp"

interface ConversionImage {
  id: string
  file: File
  preview: string
  isHeic: boolean
  status: "idle" | "loading" | "converting" | "done" | "error"
}

const FORMAT_COLORS: Record<ImageFormat, string> = {
  png: "bg-blue-500",
  jpeg: "bg-amber-500",
  webp: "bg-emerald-500",
}

export default function ImageFormatConverterPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-balance md:text-5xl">
            Image Format Converter
          </h1>
          <p className="text-lg text-balance text-muted-foreground">
            Convert your images to PNG, JPEG, or WebP format (including
            HEIC/HEIF)
          </p>
        </div>
        <ImageFormatConverter />
      </div>
    </main>
  )
}

function ImageFormatConverter() {
  const [images, setImages] = useState<ConversionImage[]>([])
  const [selectedFormat, setSelectedFormat] = useState<ImageFormat>("png")
  const [quality, setQuality] = useState(0.95)
  const [isBulkConverting, setIsBulkConverting] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const isHeicFile = (f: File) =>
    f.type === "image/heic" ||
    f.type === "image/heif" ||
    f.name.toLowerCase().endsWith(".heic") ||
    f.name.toLowerCase().endsWith(".heif")

  const processFiles = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files)
    const imageFiles = fileArray.filter(
      (f) =>
        f.type.startsWith("image/") ||
        f.name.toLowerCase().endsWith(".heic") ||
        f.name.toLowerCase().endsWith(".heif")
    )

    if (imageFiles.length === 0) {
      alert("Please select valid image files")
      return
    }

    const heicFiles = imageFiles.filter(isHeicFile)
    const nonHeicFiles = imageFiles.filter((f) => !isHeicFile(f))

    // Non-HEIC: purely synchronous, add to state instantly
    const instantEntries: ConversionImage[] = nonHeicFiles.map((file) => ({
      id: Math.random().toString(36).slice(2),
      file,
      preview: URL.createObjectURL(file),
      isHeic: false,
      status: "idle",
    }))

    // HEIC: placeholder cards shown immediately while converting in background
    const heicPlaceholders: ConversionImage[] = heicFiles.map((file) => ({
      id: Math.random().toString(36).slice(2),
      file,
      preview: "",
      isHeic: true,
      status: "loading",
    }))

    setImages((prev) => [...prev, ...instantEntries, ...heicPlaceholders])

    if (fileInputRef.current) fileInputRef.current.value = ""

    const heic2any = (await import("heic2any")).default

    for (let i = 0; i < heicFiles.length; i++) {
      const file = heicFiles[i]
      const id = heicPlaceholders[i].id
      try {
        const convertedBlob = await heic2any({
          blob: file,
          toType: "image/jpeg",
          quality: 0.9,
        })
        const blob = Array.isArray(convertedBlob)
          ? convertedBlob[0]
          : convertedBlob
        const preview = URL.createObjectURL(blob)
        const processedFile = new File(
          [blob],
          file.name.replace(/\.heic$/i, ".jpg"),
          { type: "image/jpeg" }
        )
        setImages((prev) =>
          prev.map((img) =>
            img.id === id
              ? { ...img, file: processedFile, preview, status: "idle" }
              : img
          )
        )
      } catch (err) {
        console.error("HEIC conversion failed:", file.name, err)
        setImages((prev) =>
          prev.map((img) => (img.id === id ? { ...img, status: "error" } : img))
        )
      }
    }
  }, [])

  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) await processFiles(e.target.files)
    },
    [processFiles]
  )

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      if (e.dataTransfer.files) await processFiles(e.dataTransfer.files)
    },
    [processFiles]
  )

  const convertSingle = async (
    img: ConversionImage,
    fmt: ImageFormat,
    q: number
  ): Promise<void> => {
    const canvas = canvasRef.current
    if (!canvas) return

    const el = new window.Image()
    el.crossOrigin = "anonymous"

    await new Promise((resolve, reject) => {
      el.onload = resolve
      el.onerror = reject
      el.src = img.preview
    })

    canvas.width = el.width
    canvas.height = el.height
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.drawImage(el, 0, 0)

    const mimeType = `image/${fmt}`
    const qualityValue = fmt === "png" ? undefined : q

    await new Promise<void>((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob)
            const link = document.createElement("a")
            const originalName = img.file.name.replace(/\.[^/.]+$/, "")
            link.href = url
            link.download = `${originalName}.${fmt}`
            link.click()
            URL.revokeObjectURL(url)
          }
          resolve()
        },
        mimeType,
        qualityValue
      )
    })
  }

  const handleConvertOne = async (id: string) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, status: "converting" } : img
      )
    )
    try {
      const img = images.find((i) => i.id === id)!
      await convertSingle(img, selectedFormat, quality)
      setImages((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: "done" } : i))
      )
    } catch {
      setImages((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: "error" } : i))
      )
    }
  }

  const handleBulkConvert = async () => {
    if (images.length === 0) return
    setIsBulkConverting(true)
    setImages((prev) =>
      prev.map((img) =>
        img.status === "idle" ? { ...img, status: "converting" } : img
      )
    )

    for (const img of images) {
      if (img.status !== "converting") continue
      try {
        await convertSingle(img, selectedFormat, quality)
        setImages((prev) =>
          prev.map((i) => (i.id === img.id ? { ...i, status: "done" } : i))
        )
      } catch {
        setImages((prev) =>
          prev.map((i) => (i.id === img.id ? { ...i, status: "error" } : i))
        )
      }
    }

    setIsBulkConverting(false)
  }

  const removeImage = (id: string) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id)
      if (img?.preview) URL.revokeObjectURL(img.preview)
      return prev.filter((i) => i.id !== id)
    })
  }

  const clearAll = () => {
    images.forEach((img) => {
      if (img.preview) URL.revokeObjectURL(img.preview)
    })
    setImages([])
  }

  const resetStatuses = () => {
    setImages((prev) => prev.map((img) => ({ ...img, status: "idle" })))
  }

  const readyImages = images.filter((i) => i.status !== "loading")
  const doneCount = images.filter((i) => i.status === "done").length
  const allDone = readyImages.length > 0 && doneCount === readyImages.length
  const anyLoading = images.some((i) => i.status === "loading")

  return (
    <div
      style={{ fontFamily: "'DM Mono', 'Courier New', monospace" }}
      className="space-y-5"
    >
      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragOver(true)
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 transition-all duration-200 select-none ${
          isDragOver
            ? "scale-[1.01] border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-muted/40"
        } `}
      >
        <svg
          className={`h-10 w-10 transition-colors ${isDragOver ? "text-primary" : "text-muted-foreground"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
          />
        </svg>
        <div className="text-center">
          <p className="text-sm font-medium">
            {isDragOver
              ? "Drop images here"
              : "Drag & drop images, or click to browse"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            PNG · JPEG · WebP · HEIC/HEIF · Multiple files supported
          </p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.heic,.heif"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Global settings */}
      {images.length > 0 && (
        <Card className="space-y-4 p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">
              Output Settings
            </p>
            <span className="text-xs text-muted-foreground">
              {images.length} image{images.length !== 1 ? "s" : ""} queued
              {anyLoading && (
                <span className="ml-1.5 text-amber-500">
                  · converting HEIC…
                </span>
              )}
            </span>
          </div>

          {/* Format selector */}
          <div className="flex gap-2">
            {(["png", "jpeg", "webp"] as ImageFormat[]).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setSelectedFormat(fmt)}
                className={`flex-1 rounded-lg border-2 py-2 text-sm font-bold tracking-wider uppercase transition-all duration-150 ${
                  selectedFormat === fmt
                    ? `${FORMAT_COLORS[fmt]} border-transparent text-white`
                    : "border-border bg-transparent text-muted-foreground hover:border-primary/40"
                } `}
              >
                {fmt}
              </button>
            ))}
          </div>

          {/* Quality slider */}
          {selectedFormat !== "png" && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Quality</span>
                <span className="font-mono font-bold text-foreground">
                  {Math.round(quality * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
          )}

          {/* Bulk actions */}
          <div className="flex gap-2 pt-1">
            <Button
              onClick={allDone ? resetStatuses : handleBulkConvert}
              disabled={isBulkConverting || anyLoading}
              className="flex-1 text-sm font-bold tracking-wide"
            >
              {isBulkConverting
                ? `Converting… (${doneCount}/${readyImages.length})`
                : anyLoading
                  ? "Waiting for HEIC…"
                  : allDone
                    ? "↺ Convert Again"
                    : `↓ Convert All${images.length > 1 ? ` (${images.length})` : ""}`}
            </Button>
            <Button
              variant="outline"
              onClick={clearAll}
              disabled={isBulkConverting}
              className="text-sm"
            >
              Clear All
            </Button>
          </div>
        </Card>
      )}

      {/* Image grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="group relative overflow-hidden rounded-xl border border-border bg-muted/30"
            >
              {/* Thumbnail */}
              <div className="relative aspect-square overflow-hidden bg-muted">
                {img.preview ? (
                  <img
                    src={img.preview}
                    alt={img.file.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-muted/60" />
                )}

                {/* Status overlays */}
                {img.status === "loading" && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-background/60">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
                    <span className="text-[10px] text-muted-foreground">
                      Converting…
                    </span>
                  </div>
                )}
                {img.status === "converting" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/70">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  </div>
                )}
                {img.status === "done" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-emerald-500/20">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-lg font-bold text-white">
                      ✓
                    </div>
                  </div>
                )}
                {img.status === "error" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-red-500/20">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-lg font-bold text-white">
                      !
                    </div>
                  </div>
                )}

                {/* Remove button */}
                <button
                  onClick={() => removeImage(img.id)}
                  disabled={isBulkConverting}
                  className="absolute top-1.5 right-1.5 hidden h-6 w-6 items-center justify-center rounded-full border border-border bg-background/80 text-xs text-muted-foreground transition-all group-hover:flex hover:bg-background hover:text-foreground disabled:opacity-50"
                >
                  ✕
                </button>

                {/* HEIC badge */}
                {img.isHeic && (
                  <span className="absolute top-1.5 left-1.5 rounded bg-amber-400 px-1.5 py-0.5 text-[10px] font-bold text-black">
                    HEIC
                  </span>
                )}
              </div>

              {/* File name + individual convert */}
              <div className="space-y-1.5 p-2">
                <p
                  className="truncate text-xs text-muted-foreground"
                  title={img.file.name}
                >
                  {img.file.name}
                </p>
                <button
                  onClick={() => handleConvertOne(img.id)}
                  disabled={
                    img.status === "converting" ||
                    img.status === "loading" ||
                    isBulkConverting
                  }
                  className={`w-full rounded-md py-1 text-[11px] font-bold tracking-wider uppercase transition-all duration-150 ${
                    img.status === "done"
                      ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20"
                      : img.status === "error"
                        ? "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                        : "bg-primary/10 text-primary hover:bg-primary/20"
                  } disabled:cursor-not-allowed disabled:opacity-40`}
                >
                  {img.status === "loading"
                    ? "…"
                    : img.status === "converting"
                      ? "…"
                      : img.status === "done"
                        ? "↓ Again"
                        : img.status === "error"
                          ? "Retry"
                          : `→ ${selectedFormat.toUpperCase()}`}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Progress summary */}
      {images.length > 0 && doneCount > 0 && (
        <p className="text-center text-xs text-muted-foreground">
          {doneCount} of {readyImages.length} converted
          {allDone && (
            <span className="ml-1 font-semibold text-emerald-500">
              — all done!
            </span>
          )}
        </p>
      )}

      {/* Hidden canvas */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
