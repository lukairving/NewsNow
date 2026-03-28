import * as cheerio from "cheerio"

export default defineSource(async () => {
  const html: any = await myFetch("https://bbs.hupu.com")
  const $ = cheerio.load(html)
  const $main = $("div.thread-list-common")
  const news: any = []
  $main.each((_, el) => {
    const titleEl = $(el).find("a.title")
    const title = titleEl.text().replace(/\n+/g, "").trim()
    const href = titleEl.attr("href")
    const reply = $(el).find(".reply").text().trim()
    if (title && href) {
      news.push({
        title,
        url: `https://bbs.hupu.com${href}`,
        extra: {
          info: reply,
        },
      })
    }
  })
  return news.slice(0, 20)
})
