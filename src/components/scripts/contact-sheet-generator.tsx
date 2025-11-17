import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ImageData {
  id: string;
  file: File;
  preview: string;
  width: number;
  height: number;
}

export function ContactSheetCreator() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      const totalImages = images.length + files.length;

      if (totalImages > 12) {
        alert("Maximum 12 images allowed");
        return;
      }

      const newImages: ImageData[] = [];

      for (const file of files) {
        if (!file.type.startsWith("image/")) {
          continue;
        }

        const preview = URL.createObjectURL(file);
        const img = new window.Image();

        await new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
          img.src = preview;
        });

        newImages.push({
          id: Math.random().toString(36),
          file,
          preview,
          width: img.width,
          height: img.height,
        });
      }

      setImages([...images, ...newImages]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [images],
  );

  const removeImage = (id: string) => {
    setImages(images.filter((img) => img.id !== id));
  };

  const generateContactSheet = async () => {
    if (images.length === 0) {
      alert("Please select at least one image");
      return;
    }

    setIsGenerating(true);

    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Contact sheet layout: 4 columns x 3 rows for 12 images
      const cols = 4;
      const rows = 3;
      const imageWidth = 300;
      const imageHeight = 300;
      const padding = 10;
      const margin = 20;

      const canvasWidth = cols * (imageWidth + padding) + margin * 2 - padding;
      const canvasHeight =
        rows * (imageHeight + padding) + margin * 2 - padding;

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // White background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Load and draw each image
      let imageIndex = 0;
      for (let row = 0; row < rows && imageIndex < images.length; row++) {
        for (let col = 0; col < cols && imageIndex < images.length; col++) {
          const imageData = images[imageIndex];
          const x = margin + col * (imageWidth + padding);
          const y = margin + row * (imageHeight + padding);

          // Load image
          const img = new window.Image();
          img.crossOrigin = "anonymous";

          await new Promise((resolve) => {
            img.onload = () => {
              // Draw border
              ctx.strokeStyle = "#e5e7eb";
              ctx.lineWidth = 1;
              ctx.strokeRect(x, y, imageWidth, imageHeight);

              // Draw image fitted to cell
              const scale = Math.min(
                imageWidth / imageData.width,
                imageHeight / imageData.height,
              );
              const scaledWidth = imageData.width * scale;
              const scaledHeight = imageData.height * scale;
              const offsetX = x + (imageWidth - scaledWidth) / 2;
              const offsetY = y + (imageHeight - scaledHeight) / 2;

              ctx.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);
              resolve(null);
            };
            img.onerror = resolve;
            img.src = imageData.preview;
          });

          imageIndex++;
        }
      }

      // Download as JPEG
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `contact-sheet-${Date.now()}.jpg`;
            link.click();
            URL.revokeObjectURL(url);
          }
          setIsGenerating(false);
        },
        "image/jpeg",
        0.95,
      );
    } catch (error) {
      console.error("Error generating contact sheet:", error);
      alert("Error generating contact sheet");
      setIsGenerating(false);
    }
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
              Select up to 12 images to create a contact sheet
            </p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              disabled={images.length >= 12}
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={images.length >= 12}
              className="bg-primary hover:bg-primary/90"
            >
              Select Images
              {images.length > 0 && ` (${images.length}/12)`}
            </Button>
          </div>
        </div>
      </Card>

      {images.length > 0 && (
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold mb-4">
                Selected Images ({images.length})
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="relative group rounded-lg overflow-hidden bg-muted aspect-square cursor-pointer"
                  >
                    <img
                      src={image.preview || "/placeholder.svg"}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removeImage(image.id)}
                      className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      aria-label="Remove image"
                    >
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={generateContactSheet}
                disabled={isGenerating}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                {isGenerating ? "Generating..." : "Generate Contact Sheet"}
              </Button>
              <Button
                onClick={() => setImages([])}
                variant="outline"
                disabled={isGenerating}
                className="flex-1"
              >
                Clear All
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Hidden canvas for generating contact sheet */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
