import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Download, Link, Check } from "lucide-react";
import { useState } from "react";

interface PhotoActionsProps {
  publicId: string;
  format?: string; // original format (optional)
}

export default function PhotoActions({ publicId, format }: PhotoActionsProps) {
  const [copied, setCopied] = useState(false);
  const cloudName = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME;

  if (!publicId) return null;

  // Build full-resolution download URL
  const buildDownloadUrl = (targetFormat?: string) => {
    if (targetFormat && targetFormat !== "original") {
      return `https://res.cloudinary.com/${cloudName}/image/upload/fl_attachment,f_${targetFormat}/${publicId}`;
    }
    return `https://res.cloudinary.com/${cloudName}/image/upload/fl_attachment/${publicId}`;
  };

  // Define friendly labels
  const formatLabels: Record<string, string> = {
    jpg: "JPEG (Most Compatible)",
    png: "PNG (Lossless)",
    webp: "WEBP (High Efficiency)",
    original: `Original (${format?.toUpperCase() ?? "Master"})`,
  };

  // Define safe formats
  const safeFormats = ["jpg", "png", "webp"];
  const dropdownOptions = [...safeFormats];

  // Include original if it’s not a standard safe format
  if (format && !safeFormats.includes(format.toLowerCase())) {
    dropdownOptions.push("original");
  }

  const triggerDownload = (formatChoice: string) => {
    const url = buildDownloadUrl(formatChoice);
    const a = document.createElement("a");
    a.href = url;
    a.download = "";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleCopy = async () => {
    try {
      const publicViewUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}`;
      await navigator.clipboard.writeText(publicViewUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <div className="flex flex-row gap-4 mt-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="items-center">
            <Download className="size-5" /> Download
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
        {copied ? <Check className="size-5" /> : <Link className="size-5" />}
        {copied ? "Copied!" : "Copy Link"}
      </Button>
    </div>
  );
}
