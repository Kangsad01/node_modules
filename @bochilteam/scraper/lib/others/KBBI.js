import got from "got";
import cheerio from "cheerio";
import { ScraperError } from "../utils.js";
/**
 * p = Partikel: kelas kata yang meliputi kata depan, kata sambung, kata seru, kata sandang, ucapan salam
 *
 * n = Nomina: kata benda
 */
export default async function kbbi(words) {
    const html = await got(`https://kbbi.kemdikbud.go.id/entri/${encodeURIComponent(words)}`).text();
    const $ = cheerio.load(html);
    const isExist = !/tidak ditemukan/i.test($('body > div.container.body-content > h4[style="color:red"]').text());
    if (!isExist)
        throw new ScraperError(`${words} does not exist!`);
    let results = [];
    let isContent = false, lastTitle;
    $('body > div.container.body-content').children().map((_, el) => {
        const tag = el.tagName;
        const elem = $(el);
        if (tag === 'hr')
            isContent = !isContent && !Object.keys(results).length;
        if (tag === 'h2' && isContent) {
            const index = elem.find('sup').text().trim();
            const title = elem.text().trim();
            results.push({
                index: parseInt(index),
                title,
                means: []
            });
            lastTitle = title;
        }
        if ((tag === 'ol' || tag === 'ul') && isContent && lastTitle) {
            elem.find('li').each((_, el) => {
                const li = $(el).text().trim();
                const index = results.findIndex(({ title }) => title == lastTitle);
                if (index !== -1)
                    results[index].means.push(li);
                else
                    console.log(li, lastTitle);
            });
            lastTitle = '';
        }
    });
    return results;
}