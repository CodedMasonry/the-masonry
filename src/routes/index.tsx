import { createFileRoute } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import { getRequest } from "@tanstack/react-start/server"
import { Terminal } from "@/components/Terminal"
import { useTerminal } from "@/hooks/useTerminal"
import { useEffect, useRef } from "react"
import { GridBackground } from "@/components/GridBackground"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { CloudinaryImage } from "@/components/CloudinaryImage"
import { ScrambleTextPlugin } from "gsap/all"

export interface IncomingRequestCfProperties {
  // Identity
  country: string | null // "US"
  continent: string // "NA"
  city: string // "San Francisco"
  region: string // "California"
  regionCode: string // "CA"
  postalCode: string // "94107"
  timezone: string // "America/Los_Angeles"
  metroCode: string // "807"

  // Network
  asn: number // 13335
  asOrganization: string // "Cloudflare, Inc."
  colo: string // "SFO" (datacenter IATA code)
  httpProtocol: string // "HTTP/2"
  tlsVersion: string // "TLSv1.3"
  tlsCipher: string // "AEAD-AES128-GCM-SHA256"

  // Coordinates
  latitude: string // "37.7749"
  longitude: string // "-122.4194"

  // Misc
  requestPriority: string // "weight=192;exclusive=0"
  isEUCountry: "1" | undefined
}

export const getConnectionData = createServerFn().handler(async () => {
  const request = getRequest()
  const cf: IncomingRequestCfProperties = (request as any).cf ?? {
    country: "US",
    continent: "NA",
    city: "San Francisco",
    region: "California",
    regionCode: "CA",
    postalCode: "94107",
    timezone: "America/Los_Angeles",
    metroCode: "807",
    asn: 13335,
    asOrganization: "Cloudflare, Inc.",
    colo: "SFO",
    httpProtocol: "HTTP/2",
    tlsVersion: "TLSv1.3",
    tlsCipher: "AEAD-AES128-GCM-SHA256",
    latitude: "37.7749",
    longitude: "-122.4194",
    requestPriority: "weight=192;exclusive=0",
    isEUCountry: undefined,
  }

  return {
    country: cf.country,
    continent: cf.continent,
    city: cf.city,
    region: cf.region,
    regionCode: cf.regionCode,
    postalCode: cf.postalCode,
    timezone: cf.timezone,
    asn: cf.asn,
    asOrganization: cf.asOrganization,
    colo: cf.colo,
    httpProtocol: cf.httpProtocol,
    tlsVersion: cf.tlsVersion,
    tlsCipher: cf.tlsCipher,
    latitude: cf.latitude,
    longitude: cf.longitude,
    isEU: cf.isEUCountry === "1",
  }
})

export const Route = createFileRoute("/")({
  component: App,
  loader: () => getConnectionData(),
})

function App() {
  return (
    <GridBackground className="min-h-screen bg-background text-foreground">
      <main className="relative pb-[25vh] transition-all duration-500 lg:pb-0 lg:pl-100">
        <Header />
        <IndexTerminal />
      </main>
    </GridBackground>
  )
}

function Header() {
  const container = useRef(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const cornerTL = useRef<gsap.core.Timeline | null>(null)
  const imageTL = useRef<gsap.core.Timeline | null>(null)
  const imageWrapperRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.registerPlugin(ScrambleTextPlugin)

      // ── Entrance timeline ──────────────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } })
      tl.fromTo(
        ".animate-text",
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          delay: 1.8,
          duration: 3,
          stagger: 0.2,
          scrambleText: { text: "{original}" },
        }
      )
        .fromTo(
          ".header-image-corner",
          { autoAlpha: 0 },
          { duration: 0.6, autoAlpha: 1 },
          "-=2.5"
        )
        .fromTo(
          ".header-image",
          { autoAlpha: 0 },
          { duration: 0.6, autoAlpha: 1 },
          "<0.75"
        )
        .fromTo(
          ".header-image-footer",
          { autoAlpha: 0 },
          { autoAlpha: 0.6, duration: 0.5 },
          "<0.25"
        )

      // ── Hover: corners ────────────────────────────────────────────
      cornerTL.current = gsap.timeline({ paused: true })
      cornerTL.current
        .to(
          ".corner-tl",
          { top: -20, left: -20, duration: 0.3, ease: "power2.out" },
          0
        )
        .to(
          ".corner-tr",
          { top: -20, right: -20, duration: 0.3, ease: "power2.out" },
          0
        )
        .to(
          ".corner-bl",
          { bottom: -20, left: -20, duration: 0.3, ease: "power2.out" },
          0
        )
        .to(
          ".corner-br",
          { bottom: -20, right: -20, duration: 0.3, ease: "power2.out" },
          0
        )
        .to(
          ".corner-piece",
          {
            borderColor: "var(--color-primary)",
            duration: 0.3,
            ease: "power2.out",
          },
          0
        )

      // ── Hover: image zoom ─────────────────────────────────────────
      imageTL.current = gsap.timeline({ paused: true })
      imageTL.current.to(".header-image-photo", {
        scale: 1.04,
        duration: 1.8,
        ease: "power2.out",
        easeReverse: true,
      })

      // ── Mouse events ──────────────────────────────────────────────
      const onEnter = () => {
        cornerTL.current?.play()
        imageTL.current?.play()
      }
      const onLeave = () => {
        cornerTL.current?.reverse()
        imageTL.current?.reverse()
      }

      imageWrapperRef.current?.addEventListener("mouseenter", onEnter)
      imageWrapperRef.current?.addEventListener("mouseleave", onLeave)

      return () => {
        imageWrapperRef.current?.removeEventListener("mouseenter", onEnter)
        imageWrapperRef.current?.removeEventListener("mouseleave", onLeave)
      }
    },
    { scope: container }
  )

  return (
    <div ref={container} className="mt-16 flex flex-col lg:flex-row">
      <div className="relative mx-auto flex h-fit w-fit flex-col p-8 lg:mx-0">
        <h1 className="animate-text text-center text-4xl font-bold md:text-6xl lg:text-start">
          BROCK SHAFFER
        </h1>
        <p className="animate-text text-center font-barcode tracking-widest text-primary select-none lg:ml-1 lg:text-left dark:text-foreground">
          Security Through Obscurity Defines Our World
        </p>
        <div className="flex items-center justify-center gap-4 text-sm text-foreground uppercase lg:ml-1 lg:flex-col lg:items-start lg:justify-start lg:gap-1 lg:text-2xl">
          <span className="animate-text">Developer</span>
          <span className="text-border lg:hidden">|</span>
          <span className="animate-text">Drone Pilot</span>
          <span className="text-border lg:hidden">|</span>
          <span className="animate-text">Photographer</span>
        </div>
      </div>

      <div
        ref={imageWrapperRef}
        className="header-image-wrapper relative mx-auto mt-8 max-w-2/3 md:max-w-15/16 lg:mt-0 lg:mr-16 lg:ml-auto"
      >
        <div className="header-image-corner">
          <div className="corner-piece corner-tl absolute -top-4 -left-4 h-8 w-8 border-t-2 border-l-2 border-primary/60" />
          <div className="corner-piece corner-tr absolute -top-4 -right-4 h-8 w-8 border-t-2 border-r-2 border-primary/60" />
          <div className="corner-piece corner-bl absolute -bottom-4 -left-4 h-8 w-8 border-b-2 border-l-2 border-primary/60" />
          <div className="corner-piece corner-br absolute -right-4 -bottom-4 h-8 w-8 border-r-2 border-b-2 border-primary/60" />
        </div>

        <div className="header-image relative aspect-video w-full overflow-hidden border border-border/50 bg-muted/20 shadow-2xl md:aspect-21/9">
          <div className="pointer-events-none absolute top-0 left-0 z-20 flex w-full items-start justify-between p-4 font-mono text-[10px] tracking-wider text-muted-foreground/70 mix-blend-difference md:text-xs">
            <div className="flex flex-col gap-1">
              <span>REC.709</span>
              <span>RAW_VIEWER.BIN</span>
            </div>
            <div className="flex gap-4">
              <span>ISO 120</span>
              <span>1/60s</span>
              <span>f/2.8</span>
            </div>
          </div>

          <CloudinaryImage
            publicId="sp1_iuncqb"
            alt="Photo Of Brock Shaffer"
            priority
            aspectRatio="16:9"
            wrapperRef={imageRef}
            className="header-image-photo aspect-video h-full w-full object-cover opacity-90"
          />

          <div className="pointer-events-none absolute inset-0 z-10 bg-black/10 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.2)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[4px_4px]" />
        </div>

        <div className="header-image-footer mt-2 flex items-center justify-between px-1 font-mono text-xs text-muted-foreground">
          <span>[001] MAIN_ENTRY</span>
          <span>39.9612° N, 82.9988° W</span>
        </div>
      </div>
    </div>
  )
}

function IndexTerminal() {
  const cf = Route.useLoaderData()
  const { push } = useTerminal()

  useEffect(() => {
    const lines: [
      Parameters<typeof push>[0],
      Parameters<typeof push>[1],
      number,
    ][] = [
      ["SYSTEM_INITIALIZING", "separator", 60],
      [`[NODE] LINK_ESTABLISHED : ${cf.colo}-${cf.country ?? "??"}`, "ok", 640],
      [
        `[SYS] STREAM_READY // ${crypto.randomUUID().toUpperCase().split("-")[0]}`,
        "ok",
        480,
      ],
      [`[NET] PROTOCOL_SYNC ↔ ${cf.httpProtocol} · ${cf.tlsVersion}`, "ok", 80],
      [`[NET] CIPHER_SUITE ↔ ${cf.tlsCipher}`, "ok", 60],
      ["REMOTE_METRICS_RESOLVING", "separator", 60],
      [`[UI] DRAWING HEADER`, "stdout", 200],
      [
        `[GEO] LOC_RESOLVED : ${cf.city}, ${cf.regionCode} // ${cf.latitude},${cf.longitude}`,
        "ok",
        480,
      ],
      [`[GEO] ASN_UPLINK : ${cf.asOrganization} // ID:${cf.asn}`, "ok", 80],
      [`[GEO] TZ_LOCAL : ${cf.timezone} // PC:${cf.postalCode}`, "stdout", 80],
      cf.isEU
        ? [`[ID_GATE] REGION_LOCK_APPLIED // GDPR_COMPLIANT`, "warn", 240]
        : [`[ID_GATE] REGION_BYPASS // EXTERNAL_ORIGIN`, "stdout", 240],
      [`[ID_GATE] HANDSHAKE_COMPLETE // TRUST_LVL=HIGH · GUEST`, "ok", 120],
      [`[ID_GATE] SESSION_OPEN // WELCOME_USER`, "ok", 120],
    ]

    let i = 0
    let timeout: ReturnType<typeof setTimeout>

    const schedule = () => {
      if (i >= lines.length) return
      const [text, type, delay] = lines[i]
      timeout = setTimeout(() => {
        push(text, type)
        i++
        schedule()
      }, delay)
    }

    schedule()
    return () => clearTimeout(timeout)
  }, [])

  return <Terminal />
}
