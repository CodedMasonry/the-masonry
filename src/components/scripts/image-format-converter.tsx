import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type ImageFormat = "png" | "jpeg" | "webp";

interface ConversionImage {
  id: string;
  file: File;
  preview: string;
  isHeic: boolean;
  status: "idle" | "loading" | "converting" | "done" | "error";
}

const FORMAT_COLORS: Record<ImageFormat, string> = {
  png: "bg-blue-500",
  jpeg: "bg-amber-500",
  webp: "bg-emerald-500",
};

export function ImageFormatConverter() {
  const [images, setImages] = useState<ConversionImage[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<ImageFormat>("png");
  const [quality, setQuality] = useState(0.95);
  const [isBulkConverting, setIsBulkConverting] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isHeicFile = (f: File) =>
    f.type === "image/heic" ||
    f.type === "image/heif" ||
    f.name.toLowerCase().endsWith(".heic") ||
    f.name.toLowerCase().endsWith(".heif");

  const processFiles = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const imageFiles = fileArray.filter(
      (f) =>
        f.type.startsWith("image/") ||
        f.name.toLowerCase().endsWith(".heic") ||
        f.name.toLowerCase().endsWith(".heif"),
    );

    if (imageFiles.length === 0) {
      alert("Please select valid image files");
      return;
    }

    const heicFiles = imageFiles.filter(isHeicFile);
    const nonHeicFiles = imageFiles.filter((f) => !isHeicFile(f));

    // Non-HEIC: purely synchronous, add to state instantly
    const instantEntries: ConversionImage[] = nonHeicFiles.map((file) => ({
      id: Math.random().toString(36).slice(2),
      file,
      preview: URL.createObjectURL(file),
      isHeic: false,
      status: "idle",
    }));

    // HEIC: placeholder cards shown immediately while converting in background
    const heicPlaceholders: ConversionImage[] = heicFiles.map((file) => ({
      id: Math.random().toString(36).slice(2),
      file,
      preview: "",
      isHeic: true,
      status: "loading",
    }));

    setImages((prev) => [...prev, ...instantEntries, ...heicPlaceholders]);

    if (fileInputRef.current) fileInputRef.current.value = "";

    const heic2any = (await import("heic2any")).default;

    for (let i = 0; i < heicFiles.length; i++) {
      const file = heicFiles[i];
      const id = heicPlaceholders[i].id;
      try {
        const convertedBlob = await heic2any({
          blob: file,
          toType: "image/jpeg",
          quality: 0.9,
        });
        const blob = Array.isArray(convertedBlob)
          ? convertedBlob[0]
          : convertedBlob;
        const preview = URL.createObjectURL(blob);
        const processedFile = new File(
          [blob],
          file.name.replace(/\.heic$/i, ".jpg"),
          { type: "image/jpeg" },
        );
        setImages((prev) =>
          prev.map((img) =>
            img.id === id
              ? { ...img, file: processedFile, preview, status: "idle" }
              : img,
          ),
        );
      } catch (err) {
        console.error("HEIC conversion failed:", file.name, err);
        setImages((prev) =>
          prev.map((img) =>
            img.id === id ? { ...img, status: "error" } : img,
          ),
        );
      }
    }
  }, []);

  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) await processFiles(e.target.files);
    },
    [processFiles],
  );

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      if (e.dataTransfer.files) await processFiles(e.dataTransfer.files);
    },
    [processFiles],
  );

  const convertSingle = async (
    img: ConversionImage,
    fmt: ImageFormat,
    q: number,
  ): Promise<void> => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const el = new window.Image();
    el.crossOrigin = "anonymous";

    await new Promise((resolve, reject) => {
      el.onload = resolve;
      el.onerror = reject;
      el.src = img.preview;
    });

    canvas.width = el.width;
    canvas.height = el.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(el, 0, 0);

    const mimeType = `image/${fmt}`;
    const qualityValue = fmt === "png" ? undefined : q;

    await new Promise<void>((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            const originalName = img.file.name.replace(/\.[^/.]+$/, "");
            link.href = url;
            link.download = `${originalName}.${fmt}`;
            link.click();
            URL.revokeObjectURL(url);
          }
          resolve();
        },
        mimeType,
        qualityValue,
      );
    });
  };

  const handleConvertOne = async (id: string) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, status: "converting" } : img,
      ),
    );
    try {
      const img = images.find((i) => i.id === id)!;
      await convertSingle(img, selectedFormat, quality);
      setImages((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: "done" } : i)),
      );
    } catch {
      setImages((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: "error" } : i)),
      );
    }
  };

  const handleBulkConvert = async () => {
    if (images.length === 0) return;
    setIsBulkConverting(true);
    setImages((prev) =>
      prev.map((img) =>
        img.status === "idle" ? { ...img, status: "converting" } : img,
      ),
    );

    for (const img of images) {
      if (img.status !== "converting") continue;
      try {
        await convertSingle(img, selectedFormat, quality);
        setImages((prev) =>
          prev.map((i) => (i.id === img.id ? { ...i, status: "done" } : i)),
        );
      } catch {
        setImages((prev) =>
          prev.map((i) => (i.id === img.id ? { ...i, status: "error" } : i)),
        );
      }
    }

    setIsBulkConverting(false);
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img?.preview) URL.revokeObjectURL(img.preview);
      return prev.filter((i) => i.id !== id);
    });
  };

  const clearAll = () => {
    images.forEach((img) => {
      if (img.preview) URL.revokeObjectURL(img.preview);
    });
    setImages([]);
  };

  const resetStatuses = () => {
    setImages((prev) => prev.map((img) => ({ ...img, status: "idle" })));
  };

  const readyImages = images.filter((i) => i.status !== "loading");
  const doneCount = images.filter((i) => i.status === "done").length;
  const allDone = readyImages.length > 0 && doneCount === readyImages.length;
  const anyLoading = images.some((i) => i.status === "loading");

  return (
    <div
      style={{ fontFamily: "'DM Mono', 'Courier New', monospace" }}
      className="space-y-5"
    >
      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          relative flex flex-col items-center justify-center gap-3 p-10
          border-2 border-dashed rounded-xl cursor-pointer select-none
          transition-all duration-200
          ${
            isDragOver
              ? "border-primary bg-primary/5 scale-[1.01]"
              : "border-border hover:border-primary/50 hover:bg-muted/40"
          }
        `}
      >
        <svg
          className={`w-10 h-10 transition-colors ${isDragOver ? "text-primary" : "text-muted-foreground"}`}
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
          <p className="font-medium text-sm">
            {isDragOver
              ? "Drop images here"
              : "Drag & drop images, or click to browse"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
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
        <Card className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
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
                className={`
                  flex-1 py-2 rounded-lg text-sm font-bold uppercase tracking-wider
                  border-2 transition-all duration-150
                  ${
                    selectedFormat === fmt
                      ? `${FORMAT_COLORS[fmt]} text-white border-transparent`
                      : "border-border text-muted-foreground hover:border-primary/40 bg-transparent"
                  }
                `}
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {images.map((img) => (
            <div
              key={img.id}
              className="group relative rounded-xl overflow-hidden border border-border bg-muted/30"
            >
              {/* Thumbnail */}
              <div className="aspect-square relative overflow-hidden bg-muted">
                {img.preview ? (
                  <img
                    src={img.preview}
                    alt={img.file.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted/60" />
                )}

                {/* Status overlays */}
                {img.status === "loading" && (
                  <div className="absolute inset-0 bg-background/60 flex flex-col items-center justify-center gap-1.5">
                    <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                    <span className="text-[10px] text-muted-foreground">
                      Converting…
                    </span>
                  </div>
                )}
                {img.status === "converting" && (
                  <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                {img.status === "done" && (
                  <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center">
                    <div className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">
                      ✓
                    </div>
                  </div>
                )}
                {img.status === "error" && (
                  <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                    <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">
                      !
                    </div>
                  </div>
                )}

                {/* Remove button */}
                <button
                  onClick={() => removeImage(img.id)}
                  disabled={isBulkConverting}
                  className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-background/80 border border-border
                    text-muted-foreground hover:text-foreground hover:bg-background
                    hidden group-hover:flex items-center justify-center text-xs
                    transition-all disabled:opacity-50"
                >
                  ✕
                </button>

                {/* HEIC badge */}
                {img.isHeic && (
                  <span className="absolute top-1.5 left-1.5 text-[10px] font-bold bg-amber-400 text-black px-1.5 py-0.5 rounded">
                    HEIC
                  </span>
                )}
              </div>

              {/* File name + individual convert */}
              <div className="p-2 space-y-1.5">
                <p
                  className="text-xs text-muted-foreground truncate"
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
                  className={`
                    w-full text-[11px] font-bold uppercase tracking-wider py-1 rounded-md
                    transition-all duration-150
                    ${
                      img.status === "done"
                        ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20"
                        : img.status === "error"
                          ? "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                          : "bg-primary/10 text-primary hover:bg-primary/20"
                    }
                    disabled:opacity-40 disabled:cursor-not-allowed
                  `}
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
            <span className="ml-1 text-emerald-500 font-semibold">
              — all done!
            </span>
          )}
        </p>
      )}

      {/* Hidden canvas */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
