import * as cheerio from "cheerio"

export default defineSource(async () => {
  const html: any = await myFetch("https://lobste.rs/hot")
  const $ = cheerio.load(html)
  const $main = $("div.stories")
  const news: any = []
  $main.each((_, el) => {
    const a = $(el).find("a.story__link")
    const title = a.text().replace(/\n+/g, "").trim()
    const href = a.attr("href")
    const score = $(el).find(".score").first().text().trim()
    const tags = $(el).find(".tags .tag").map((i, t) => $(t).text()).get().join(", ")
    if (title && href) {
      news.push({
        title,
        url: href?.startsWith("/") ? `https://lobste.rs${href}` : href,
        extra: {
          info: `${score} pts · ${tags}`,
        },
      })
    }
  })
  return news.slice(0, 20)
})
