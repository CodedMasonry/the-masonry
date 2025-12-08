import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Download, Link, Check } from "lucide-react";
import { useState } from "react";

const hasTouch =
  typeof window !== "undefined" &&
  ("ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    (navigator as any).msMaxTouchPoints > 0);

// We define "mobile" as a device that has touch AND a small screen
const isMobile = hasTouch && window.matchMedia("(max-width: 768px)").matches;

interface PhotoActionsProps {
  publicId: string;
  format?: string; // original format (optional)
}

export default function PhotoActions({ publicId, format }: PhotoActionsProps) {
  const [copied, setCopied] = useState(false);
  const cloudName = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME;

  if (!publicId) return null;

  // UPDATED: More flexible URL builder
  const buildUrl = (targetFormat?: string, asAttachment: boolean = true) => {
    const parts = ["image", "upload"];
    const flags = [];

    // Add attachment flag only if requested (for desktop)
    if (asAttachment) {
      flags.push("fl_attachment");
    }

    // Add format flag if specified
    if (targetFormat && targetFormat !== "original") {
      flags.push(`f_${targetFormat}`);
    }

    if (flags.length > 0) {
      parts.push(flags.join(","));
    }

    parts.push(publicId);

    return `https://res.cloudinary.com/${cloudName}/${parts.join("/")}`;
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

  if (format && !safeFormats.includes(format.toLowerCase())) {
    dropdownOptions.push("original");
  }

  // --- UPDATED: Conditional Download Logic ---
  const triggerDownload = (formatChoice: string) => {
    if (isMobile) {
      // On mobile: Open image in a new tab for "Save to Photos".
      // We pass `false` to buildUrl to *avoid* fl_attachment.
      const url = buildUrl(formatChoice, false);
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      // On desktop: Force file download using the anchor tag trick.
      // We pass `true` to buildUrl to *include* fl_attachment.
      const url = buildUrl(formatChoice, true);
      const a = document.createElement("a");
      a.href = url;
      a.download = ""; // fl_attachment handles the file name
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handleCopy = async () => {
    try {
      // Use the builder to get the non-attachment, viewable URL
      const publicViewUrl = buildUrl(undefined, false);
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
