import * as cheerio from "cheerio"

export default defineSource(async () => {
  const html: any = await myFetch("https://www.xiaohongshu.com/search_result?keyword=%E7%83%AD%E7%82%B9&source=web_explore_feed")
  const $ = cheerio.load(html)
  const $main = $("div.note-item")
  const news: any = []
  $main.each((_, el) => {
    const titleEl = $(el).find("a.title")
    const title = titleEl.text().replace(/\n+/g, "").trim()
    const href = titleEl.attr("href")
    const likeEl = $(el).find(".like-wrapper .count")
    const like = likeEl.text().trim()
    if (title) {
      news.push({
        title,
        url: href?.startsWith("/") ? `https://www.xiaohongshu.com${href}` : href || "#",
        extra: {
          info: like ? `❤️ ${like}` : "",
        },
      })
    }
  })
  return news.slice(0, 20)
})
