import { NextResponse } from "next/server"
import { GIFT_MAGNET } from "@/lib/gift-magnet"

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    const pdfUrl = `${baseUrl.replace(/\/$/, "")}${GIFT_MAGNET.filePath}`

    const response = await fetch(pdfUrl)

    if (!response.ok) {
      throw new Error(`PDF fetch returned ${response.status}`)
    }

    const pdfBuffer = await response.arrayBuffer()

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${GIFT_MAGNET.fileName}"`,
        "Content-Length": pdfBuffer.byteLength.toString(),
        "Cache-Control": "public, max-age=86400",
      },
    })
  } catch {
    return new NextResponse("File not found", { status: 404 })
  }
}
