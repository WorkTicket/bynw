const https = require("https")

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "user-agent": "Mozilla/5.0 seo-check" } }, (res) => {
        let d = ""
        res.on("data", (c) => (d += c))
        res.on("end", () => resolve(d))
      })
      .on("error", reject)
  })
}

function post(html) {
  const body = JSON.stringify({ html })
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: "validator.schema.org",
        path: "/validate",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
          Accept: "application/json",
        },
      },
      (res) => {
        let d = ""
        res.on("data", (c) => (d += c))
        res.on("end", () => {
          d = d.replace(/^\)\]\}'\n/, "")
          try {
            resolve(JSON.parse(d))
          } catch (e) {
            reject(new Error(d.slice(0, 500)))
          }
        })
      }
    )
    req.on("error", reject)
    req.write(body)
    req.end()
  })
}

async function main() {
  const url = "https://bynmwcreative.com/shop/princesas-disney"
  const html = await get(url)
  const types = [...html.matchAll(/"@type":"([^"]+)"/g)].map((m) => m[1])
  console.log("Embedded @types:", [...new Set(types)].join(", "))

  const result = await post(html)
  console.log(
    "Schema.org validator — objects:",
    result.numObjects,
    "errors:",
    result.totalNumErrors,
    "warnings:",
    result.totalNumWarnings
  )
  if (result.errors?.length) {
    console.log("Errors:", JSON.stringify(result.errors, null, 2).slice(0, 1500))
  }
  if (result.tripleGroups?.length) {
    console.log(
      "Groups:",
      result.tripleGroups
        .map((g) => g.type || g.nodeType || JSON.stringify(g).slice(0, 80))
        .join(" | ")
    )
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
