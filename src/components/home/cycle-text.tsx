import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";

export function CycleText({ options }: { options: Array<string> }) {
  const [index, setIndex] = useState(0);
  const [prevText, setPrevText] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const enterRef = useRef<HTMLDivElement>(null);
  const exitRef = useRef<HTMLDivElement>(null);

  // Cycle index — capture outgoing text reliably
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        const outgoing = options[prev];
        setPrevText(outgoing);
        return (prev + 1) % options.length;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [options]);

  // Animate with gsap.context so it's Safe in React Strict Mode / Astro
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { duration: 0.5, ease: "back.inOut" },
      });

      if (exitRef.current) {
        tl.fromTo(
          exitRef.current,
          { opacity: 1, y: 0, filter: "blur(0px)" },
          { opacity: 0, y: 25, filter: "blur(10px)", immediateRender: false },
          0,
        );
      }

      if (enterRef.current) {
        // ensure GSAP doesn't need to reset the style after paint
        gsap.set(enterRef.current, {
          opacity: 0,
          y: -25,
          filter: "blur(10px)",
        });

        tl.to(enterRef.current, { opacity: 1, y: 0, filter: "blur(0px)" }, 0);
      }

      return () => tl.kill();
    }, containerRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={containerRef} className="relative overflow-hidden h-12">
      <div
        ref={enterRef}
        className="absolute top-0 left-0 underline decoration-primary font-bold pointer-events-none"
      >
        {options[index]}
      </div>

      {prevText && (
        <div
          ref={exitRef}
          className="absolute top-0 left-0 underline decoration-primary font-bold pointer-events-none"
        >
          {prevText}
        </div>
      )}
    </div>
  );
}
