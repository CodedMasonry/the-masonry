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
import { CameraIcon, CodeIcon, DroneIcon } from "@phosphor-icons/react"

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
      <main className="relative pb-[25vh] transition-all duration-500 lg:pb-0 lg:pl-80">
        <Header />
        <IndexTerminal />
      </main>
    </GridBackground>
  )
}

function Header() {
  const container = useRef(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } })
      tl.from(".animate-text", {
        y: 20,
        autoAlpha: 0,
        delay: 1.8,
        duration: 0.6,
        stagger: 0.1,
      })
        .from(
          ".header-image-corner",
          {
            duration: 0.8,
            autoAlpha: 0,
          },
          "-=0.4"
        )
        .from(".header-image", { autoAlpha: 0, duration: 0.8 })
        .fromTo(
          ".header-image-footer",
          { autoAlpha: 0, duration: 0 },
          { autoAlpha: 0.6, duration: 0.2 }
        )
    },
    { scope: container }
  )

  return (
    <div ref={container} className="mt-16 flex flex-col lg:flex-row">
      <div className="relative mx-auto flex h-fit w-fit flex-col p-8 transition-all lg:mx-0">
        <h1 className="animate-text invisible text-6xl font-bold">
          BROCK SHAFFER
        </h1>
        <p className="animate-text invisible text-center font-barcode tracking-widest text-primary select-none lg:ml-1 lg:text-left dark:text-foreground">
          Security Through Obscurity Defines Our World
        </p>
        <div className="flex items-center justify-center gap-4 text-sm text-foreground uppercase lg:ml-1 lg:flex-col lg:items-start lg:justify-start lg:gap-1 lg:text-2xl">
          <span className="animate-text invisible flex items-center gap-1 align-middle">
            <CodeIcon className="lg:hidden" /> Developer
          </span>
          <span className="text-border lg:hidden">|</span>
          <span className="animate-text invisible flex items-center gap-1 align-middle">
            <DroneIcon className="lg:hidden" /> Drone Pilot
          </span>
          <span className="text-border lg:hidden">|</span>
          <span className="animate-text invisible flex items-center gap-1 align-middle">
            <CameraIcon className="lg:hidden" /> Photographer
          </span>
        </div>
      </div>
      <div className="group perspective-1000 relative mx-auto max-w-2/3 md:max-w-15/16 lg:mr-16 lg:ml-auto">
        <div className="header-image-corner invisible">
          <div className="absolute -top-4 -left-4 h-8 w-8 border-t-2 border-l-2 border-primary/60 transition-all duration-500 group-hover:-top-5 group-hover:-left-5 group-hover:border-primary"></div>
          <div className="absolute -top-4 -right-4 h-8 w-8 border-t-2 border-r-2 border-primary/60 transition-all duration-500 group-hover:-top-5 group-hover:-right-5 group-hover:border-primary"></div>
          <div className="absolute -bottom-4 -left-4 h-8 w-8 border-b-2 border-l-2 border-primary/60 transition-all duration-500 group-hover:-bottom-5 group-hover:-left-5 group-hover:border-primary"></div>
          <div className="absolute -right-4 -bottom-4 h-8 w-8 border-r-2 border-b-2 border-primary/60 transition-all duration-500 group-hover:-right-5 group-hover:-bottom-5 group-hover:border-primary"></div>
        </div>

        <div className="header-image invisible relative aspect-video w-full overflow-hidden border border-border/50 bg-muted/20 shadow-2xl md:aspect-21/9">
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
            className="aspect-video h-full w-full object-cover opacity-90 transition-transform duration-[2s] ease-out group-hover:scale-[1.02]"
          />

          <div className="pointer-events-none absolute inset-0 z-10 bg-black/10 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.2)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[4px_4px]"></div>
        </div>

        <div className="header-image-footer invisible mt-2 flex items-center justify-between px-1 font-mono text-xs text-muted-foreground">
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
