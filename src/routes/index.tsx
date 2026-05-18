import { createFileRoute, Link } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import { getRequest } from "@tanstack/react-start/server"
import { Terminal } from "@/components/Terminal"
import { useTerminal, type TerminalLineType } from "@/hooks/useTerminal"
import { useEffect, useRef, useState } from "react"
import { GridBackground } from "@/components/GridBackground"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { CloudinaryImage } from "@/components/CloudinaryImage"
import { MotionPathPlugin } from "gsap/all"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import {
  ApertureIcon,
  ArrowRightIcon,
  GithubLogoIcon,
} from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"

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
  staleTime: Infinity,
})

gsap.registerPlugin(MotionPathPlugin)

function App() {
  const [headerFinished, setHeaderFinished] = useState(false)

  return (
    <GridBackground className="min-h-screen bg-background text-foreground">
      <main className="relative h-full pb-[25vh] transition-all duration-500 lg:pb-0 lg:pl-100">
        <Header
          onComplete={() => {
            setHeaderFinished(true)
          }}
        />
        <GalleryShowcase active={headerFinished} />
        <IndexTerminal />
        <div className="pointer-events-none fixed right-4 bottom-4 font-barcode">
          security through obscurity is no security at all
        </div>
      </main>
    </GridBackground>
  )
}

function Header({ onComplete }: { onComplete: () => void }) {
  const container = useRef<HTMLDivElement>(null)
  const cornerTL = useRef<gsap.core.Timeline | null>(null)
  const imageTL = useRef<gsap.core.Timeline | null>(null)
  const imageWrapperRef = useRef<HTMLDivElement>(null)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  useGSAP(
    () => {
      gsap.set(".corner-tl", { x: -8, y: -8 })
      gsap.set(".corner-tr", { x: 8, y: -8 })
      gsap.set(".corner-bl", { x: -8, y: 8 })
      gsap.set(".corner-br", { x: 8, y: 8 })
      gsap.set(".corner-piece", { "--corner-opacity": 0.6 })

      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        onComplete: onComplete,
      })

      tl.fromTo(
        ".animate-text",
        { autoAlpha: 0 },
        { autoAlpha: 1, delay: 1, duration: 1.5, stagger: 0.1 }
      )
        .fromTo(
          ".header-image-corner",
          { autoAlpha: 0, scale: 1.1 },
          { autoAlpha: 1, scale: 1, duration: 0.8 },
          "-=1"
        )
        .fromTo(
          ".header-image",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 1 },
          "<0.2"
        )
        .fromTo(
          ".header-image-footer",
          { autoAlpha: 0 },
          { autoAlpha: 0.6, duration: 0.5 },
          "<0.25"
        )
        .fromTo(
          ".link-display",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.5 },
          "<.25"
        )

      cornerTL.current = gsap.timeline({
        paused: true,
        defaults: { easeReverse: true },
      })
      cornerTL.current
        .to(
          ".corner-tl",
          { x: -16, y: -16, duration: 0.4, ease: "power2.out" },
          0
        )
        .to(
          ".corner-tr",
          { x: 16, y: -16, duration: 0.4, ease: "power2.out" },
          0
        )
        .to(
          ".corner-bl",
          { x: -16, y: 16, duration: 0.4, ease: "power2.out" },
          0
        )
        .to(
          ".corner-br",
          { x: 16, y: 16, duration: 0.4, ease: "power2.out" },
          0
        )
        .to(
          ".corner-piece",
          {
            "--corner-opacity": 1,
            duration: 0.4,
          },
          0
        )

      imageTL.current = gsap.timeline({ paused: true })
      imageTL.current.to(".header-image-photo", {
        scale: 1.05,
        duration: 1.2,
        ease: "power2.out",
        easeReverse: true,
      })

      const onEnter = () => {
        cornerTL.current?.play()
        imageTL.current?.play()
      }
      const onLeave = () => {
        cornerTL.current?.reverse()
        imageTL.current?.reverse()
      }

      const wrapper = imageWrapperRef.current
      wrapper?.addEventListener("mouseenter", onEnter)
      wrapper?.addEventListener("mouseleave", onLeave)

      return () => {
        wrapper?.removeEventListener("mouseenter", onEnter)
        wrapper?.removeEventListener("mouseleave", onLeave)
      }
    },
    { scope: container }
  )

  return (
    <section ref={container} className="mt-16 flex flex-col lg:flex-row">
      <div className="relative mx-auto flex h-fit w-full flex-col items-center gap-1 p-4 text-center md:w-fit md:p-8 lg:mx-0 lg:items-start lg:text-start">
        <h1 className="animate-text text-4xl font-extrabold opacity-0 md:text-6xl">
          BROCK SHAFFER
        </h1>
        <p className="animate-text text-sm font-light tracking-tight text-muted-foreground italic opacity-0 md:text-base">
          Still can't figure out what to name component files.
        </p>
        <span className="animate-text text-lg font-medium uppercase opacity-0 lg:text-2xl">
          Developer
        </span>

        <div className="link-display mx-auto mt-4 flex cursor-default gap-4 opacity-0 lg:ml-0">
          <a
            href="https://github.com/BitSiphon"
            className="flex cursor-default"
          >
            <Button size="lg">
              <GithubLogoIcon strokeWidth={2} className="size-6" />
              Github
            </Button>
          </a>
          <Link to="/photos" className="flex cursor-default">
            <Button variant="outline" size="lg">
              <ApertureIcon strokeWidth={2} className="size-6" />
              Gallery
            </Button>
          </Link>
        </div>
      </div>

      <div
        ref={imageWrapperRef}
        className="header-image-wrapper relative mx-auto mt-8 w-full max-w-[90%] lg:mt-0 lg:mr-16 lg:ml-auto lg:max-w-[40vw]"
      >
        <div className="header-image-corner pointer-events-none absolute inset-0 z-20 opacity-0">
          {[
            { id: "tl", pos: "top-0 left-0", borders: "border-t-2 border-l-2" },
            {
              id: "tr",
              pos: "top-0 right-0",
              borders: "border-t-2 border-r-2",
            },
            {
              id: "bl",
              pos: "bottom-0 left-0",
              borders: "border-b-2 border-l-2",
            },
            {
              id: "br",
              pos: "bottom-0 right-0",
              borders: "border-r-2 border-b-2",
            },
          ].map((corner) => (
            <div
              key={corner.id}
              className={`corner-piece corner-${corner.id} absolute h-8 w-8 ${corner.pos} ${corner.borders}`}
              style={
                {
                  borderColor: `oklch(0.473 0.137 46.201 / var(--corner-opacity))`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        <div className="header-image relative w-full overflow-hidden border border-border/50 bg-muted/20 opacity-0 shadow-2xl">
          <CloudinaryImage
            publicId="sp1_iuncqb"
            alt="Photo Of Brock Shaffer"
            priority
            aspectRatio={isDesktop ? "21:9" : "16:9"}
            wrapperClassName="w-full [aspect-ratio:16/9] md:[aspect-ratio:21/9]"
            className="header-image-photo h-full w-full object-cover opacity-90"
          />
          <div className="pointer-events-none absolute inset-0 z-10 bg-black/10 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.2)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[4px_4px]" />
        </div>

        <div className="header-image-footer mt-2 flex items-center justify-between px-1 font-mono text-xs text-muted-foreground opacity-0">
          <span>[001] MAIN_ENTRY</span>
          <span>39.9612° N, 82.9988° W</span>
        </div>
      </div>
    </section>
  )
}

function GalleryShowcase({ active }: { active: boolean }) {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!active) {
        gsap.set([".section-title", ".gallery-card"], { autoAlpha: 0, y: 20 })
        return
      }

      const entranceTl = gsap.timeline({ defaults: { ease: "power3.out" } })

      entranceTl
        .to(".section-title", { autoAlpha: 1, y: 0, duration: 1 })
        .to(
          ".gallery-card",
          { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.15 },
          "-=0.6"
        )

      const cards = gsap.utils.toArray<HTMLElement>(".gallery-card")
      cards.forEach((card) => {
        const image = card.querySelector(".card-image")
        const corners = card.querySelectorAll(".card-corner")
        const arrow = card.querySelector(".card-arrow")
        const overlay = card.querySelector(".card-overlay")

        const hoverTl = gsap.timeline({ paused: true })
        hoverTl
          .to(image, { scale: 1.05, duration: 0.6, ease: "power2.out" }, 0)
          .to(
            overlay,
            { backgroundColor: "rgba(0,0,0,0.05)", duration: 0.4 },
            0
          )
          .to(corners[0], { x: -4, y: -4, opacity: 1, duration: 0.3 }, 0) // TL
          .to(corners[1], { x: 4, y: 4, opacity: 1, duration: 0.3 }, 0) // BR
          .to(arrow, { x: 5, duration: 0.3 }, 0)

        card.addEventListener("mouseenter", () => hoverTl.play())
        card.addEventListener("mouseleave", () => hoverTl.reverse())
      })
    },
    { scope: container, dependencies: [active] }
  )

  const galleryItems = [
    {
      id: "DJI_20240801201214_0045_D_vtzl3w",
      label: "DRONE / CITYSCAPE",
      alt: "Downtown Dublin Ohio",
      href: "/photos",
    },
    {
      id: "DJI_20251108110602_0075_D_j0ie3e",
      label: "PHOTO / CITYSCAPE",
      alt: "Suburban Columbus Ohio",
      href: "/projects",
    },
    {
      id: "damA2_09_20_25_rkfd0k",
      label: "DRONE / INFRASTRUCTURE",
      alt: "Black and white portrait",
      href: "/photos",
    },
  ]

  return (
    <section
      ref={container}
      className="relative mx-auto flex w-full flex-col px-4 pt-36 md:px-6"
    >
      <h2 className="section-title text-2xl font-semibold tracking-tighter text-foreground opacity-0 md:text-4xl lg:self-start">
        FINDING BEAUTY IN DETAILS
      </h2>

      <div className="mt-4 grid w-full grid-cols-1 gap-6 md:grid-cols-3">
        {galleryItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className="gallery-card group relative aspect-video cursor-default overflow-hidden border border-border/50 bg-muted/20 opacity-0"
          >
            <div className="card-image h-full w-full">
              <CloudinaryImage
                publicId={item.id}
                alt={item.alt}
                className="h-full w-full object-cover opacity-90"
              />
            </div>
            <div className="card-overlay absolute inset-0 bg-black/15" />
            <div className="card-corner absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-primary/40 opacity-0" />
            <div className="card-corner absolute right-0 bottom-0 h-4 w-4 border-r-2 border-b-2 border-primary/40 opacity-0" />

            <div className="absolute right-0 bottom-0 left-0 flex items-end justify-between p-3 font-mono text-xs text-white/90 mix-blend-difference md:text-sm">
              <span className="font-medium">{item.label}</span>
              <ArrowRightIcon size={16} className="card-arrow" />
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

function IndexTerminal() {
  const cf = Route.useLoaderData()
  const { push } = useTerminal()

  useEffect(() => {
    // Structure: [text, type, options, delay]
    const sequence: [
      string,
      TerminalLineType,
      { label?: string; meta?: string; status?: string; text?: string },
      number,
    ][] = [
      ["SYSTEM_INITIALIZING", "separator", {}, 60],
      [
        "LINK_ESTABLISHED",
        "ok",
        {
          label: "NODE",
          meta: `${cf.colo}-${cf.country ?? "??"}`,
        },
        640,
      ],
      [
        "STREAM_READY",
        "ok",
        {
          meta: crypto.randomUUID().toUpperCase().split("-")[0],
          status: "Ok",
        },
        480,
      ],
      [
        "PROTOCOL_SYNC",
        "ok",
        {
          label: "NET",
          meta: `${cf.httpProtocol} · ${cf.tlsVersion}`,
        },
        80,
      ],
      ["CIPHER_SUITE", "ok", { label: "NET", meta: cf.tlsCipher }, 60],
      ["REMOTE_METRICS_RESOLVING", "separator", {}, 60],
      ["DRAWING HEADER", "stdout", { label: "UI", status: "Started" }, 200],
      [
        "LOC_RESOLVED",
        "ok",
        {
          label: "GEO",
          meta: `${cf.latitude},${cf.longitude}`,
          text: `${cf.city}, ${cf.regionCode}`,
        },
        480,
      ],
      [
        `ASN_UPLINK : ${cf.asOrganization}`,
        "ok",
        { label: "GEO", meta: `ID:${cf.asn}` },
        80,
      ],
      ["TZ_LOCAL", "stdout", { label: "GEO", meta: `PC:${cf.postalCode}` }, 80],
      cf.isEU
        ? [
            "REGION_LOCK_APPLIED",
            "warn",
            { label: "ID_GATE", meta: "GDPR_COMPLIANT", status: "Active" },
            240,
          ]
        : [
            "REGION_BYPASS",
            "stdout",
            { label: "ID_GATE", meta: "EXTERNAL_ORIGIN" },
            240,
          ],
      [
        "HANDSHAKE_COMPLETE",
        "ok",
        { label: "ID_GATE", meta: "TRUST_LVL=HIGH" },
        120,
      ],
      ["WELCOME_USER", "ok", { label: "ID_GATE", meta: "SESSION_OPEN" }, 120],
    ]

    const timeouts: ReturnType<typeof setTimeout>[] = []
    let i = 0

    const schedule = () => {
      if (i >= sequence.length) return
      const [text, type, opts, delay] = sequence[i]

      const id = setTimeout(() => {
        push(text, type, opts)
        i++
        schedule()
      }, delay)

      timeouts.push(id)
    }

    schedule()
    return () => timeouts.forEach(clearTimeout)
  }, [cf])

  return <Terminal />
}
