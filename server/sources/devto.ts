import * as cheerio from "cheerio"

export default defineSource(async () => {
  const html: any = await myFetch("https://dev.to/top/week")
  const $ = cheerio.load(html)
  const $main = $("article.crayons-card")
  const news: any = []
  $main.each((_, el) => {
    const titleEl = $(el).find("h2 a")
    const title = titleEl.text().replace(/\n+/g, "").trim()
    const href = titleEl.attr("href")
    const reactions = $(el).find("[data-testid='like-count']").text().trim()
    const readingTime = $(el).find(".crayons-card__sub-title").text().trim()
    if (title && href) {
      news.push({
        title,
        url: `https://dev.to${href}`,
        extra: {
          info: `${reactions || ""} · ${readingTime || ""}`,
        },
      })
    }
  })
  return news.slice(0, 20)
})
