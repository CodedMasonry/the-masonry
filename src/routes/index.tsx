import { createFileRoute } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import { getRequest } from "@tanstack/react-start/server"
import { Terminal } from "@/components/terminal"
import { useTerminal } from "@/hooks/useTerminal"
import { useEffect } from "react"
import { GridBackground } from "@/components/grid-background"

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

  return (
    <GridBackground className="min-h-screen bg-background">
      <div className="flex flex-col gap-4">
        <h1 className="mt-16 text-6xl font-bold">BROCK SHAFFER</h1>
        <h1 className="mt-16 text-6xl font-bold"></h1>
        <h2></h2>
      </div>
      <Terminal />
    </GridBackground>
  )
}
