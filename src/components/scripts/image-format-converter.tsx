import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type ImageFormat = "png" | "jpeg" | "webp";

interface ConversionImage {
  id: string;
  file: File;
  preview: string;
  isHeic: boolean;
}

export function ImageFormatConverter() {
  const [image, setImage] = useState<ConversionImage | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<ImageFormat>("png");
  const [quality, setQuality] = useState(0.95);
  const [isConverting, setIsConverting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const isHeic =
        file.type === "image/heic" ||
        file.type === "image/heif" ||
        file.name.toLowerCase().endsWith(".heic") ||
        file.name.toLowerCase().endsWith(".heif");

      if (!file.type.startsWith("image/") && !isHeic) {
        alert("Please select a valid image file");
        return;
      }

      setIsProcessing(true);

      try {
        let preview: string;
        let processedFile = file;

        if (isHeic) {
          // Convert HEIC to blob for preview
          const heic2any = (await import("heic2any")).default;
          const convertedBlob = await heic2any({
            blob: file,
            toType: "image/jpeg",
            quality: 0.9,
          });

          const blob = Array.isArray(convertedBlob)
            ? convertedBlob[0]
            : convertedBlob;
          preview = URL.createObjectURL(blob);
          processedFile = new File(
            [blob],
            file.name.replace(/\.heic$/i, ".jpg"),
            { type: "image/jpeg" },
          );
        } else {
          preview = URL.createObjectURL(file);
        }

        setImage({
          id: Math.random().toString(36),
          file: processedFile,
          preview,
          isHeic,
        });
      } catch (error) {
        console.error("Error processing image:", error);
        alert("Error processing HEIC image. Please try another file.");
      } finally {
        setIsProcessing(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    },
    [],
  );

  const convertImage = async () => {
    if (!image) {
      alert("Please select an image first");
      return;
    }

    setIsConverting(true);

    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const img = new window.Image();
      img.crossOrigin = "anonymous";

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = image.preview;
      });

      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);

      // Convert to selected format
      const mimeType = `image/${selectedFormat}`;
      const qualityValue = selectedFormat === "png" ? undefined : quality;

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            const originalName = image.file.name.replace(/\.[^/.]+$/, "");
            link.href = url;
            link.download = `${originalName}.${selectedFormat}`;
            link.click();
            URL.revokeObjectURL(url);
          }
          setIsConverting(false);
        },
        mimeType,
        qualityValue,
      );
    } catch (error) {
      console.error("Error converting image:", error);
      alert("Error converting image");
      setIsConverting(false);
    }
  };

  const clearImage = () => {
    if (image) {
      URL.revokeObjectURL(image.preview);
    }
    setImage(null);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 border-2 border-dashed border-border">
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center">
            <svg
              className="w-12 h-12 text-muted-foreground mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-muted-foreground text-center mb-4">
              Select an image to convert (including HEIC/HEIF)
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.heic,.heif"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="bg-primary hover:bg-primary/90"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Select Image"}
            </Button>
          </div>
        </div>
      </Card>

      {image && (
        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Image Preview</h2>
              <div className="relative rounded-lg overflow-hidden bg-muted max-w-md mx-auto">
                <img
                  src={image.preview || "/placeholder.svg"}
                  alt="preview"
                  className="w-full h-auto"
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2 text-center">
                {image.file.name}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Output Format
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant={selectedFormat === "png" ? "default" : "outline"}
                    onClick={() => setSelectedFormat("png")}
                    className="w-full"
                  >
                    PNG
                  </Button>
                  <Button
                    variant={selectedFormat === "jpeg" ? "default" : "outline"}
                    onClick={() => setSelectedFormat("jpeg")}
                    className="w-full"
                  >
                    JPEG
                  </Button>
                  <Button
                    variant={selectedFormat === "webp" ? "default" : "outline"}
                    onClick={() => setSelectedFormat("webp")}
                    className="w-full"
                  >
                    WebP
                  </Button>
                </div>
              </div>

              {selectedFormat !== "png" && (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Quality: {Math.round(quality * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={quality}
                    onChange={(e) => setQuality(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={convertImage}
                disabled={isConverting}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                {isConverting ? "Converting..." : "Convert & Download"}
              </Button>
              <Button
                onClick={clearImage}
                variant="outline"
                disabled={isConverting}
                className="flex-1"
              >
                Clear
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Hidden canvas for conversion */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
