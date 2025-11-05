import { Button } from "@/components/ui/button";
import { Download, Link, Check } from "lucide-react";
import { useState } from "react";

interface PhotoActionsProps {
  url: string;
}

export default function PhotoActions({ url }: PhotoActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleDownload = async () => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = url.split("/").pop() || "photo.jpg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <div className="flex flex-row gap-4 mt-6">
      <Button onClick={handleDownload} className="items-center">
        <Download className="size-5" /> Download Original
      </Button>
      <Button onClick={handleCopy} variant="ghost" className="items-center">
        {copied ? <Check className="size-5" /> : <Link className="size-5" />}
        {copied ? "Copied!" : "Copy Link"}
      </Button>
    </div>
  );
}
