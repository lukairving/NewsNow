import * as cheerio from "cheerio"

export default defineSource(async () => {
  const html: any = await myFetch("https://www.reddit.com/r/popular/hot/")
  const $ = cheerio.load(html)
  const $main = $("article")
  const news: any = []
  $main.each((_, el) => {
    const a = $(el).find("a")
    const title = $(el).find("h3").text().trim() || $(el).text().trim()
    const href = a.first().attr("href")
    const scoreEl = $(el).find("[data-click-id='upvote_count']")
    const score = scoreEl.text().trim()
    if (title) {
      news.push({
        title,
        url: href?.startsWith("/") ? `https://reddit.com${href}` : href || "#",
        extra: {
          info: score || "",
        },
      })
    }
  })
  return news.slice(0, 20)
})
