import got from 'got';
import cheerio from 'cheerio';
export default async function antaranews() {
    const html = await got('https://www.antaranews.com/').text();
    const $ = cheerio.load(html);
    const results = [];
    $('div.terkini > article.simple-post').each((_, el) => {
        const $el = $(el);
        const title = $el.find('.latest-news > a').text();
        const link = $el.find('.latest-news > a').attr('href');
        const $image = $el.find('picture');
        const image = $image.find('img').attr('src') ||
            $image.find('img').attr('data-src') ||
            $image.find('source').attr('srcset') ||
            $image.find('source').attr('data-srcset') || null;
        const label = $el.find('.simple-share').text();
        const date = $el.find('.simple-share > span').text();
        if (title)
            results.push({
                title,
                link,
                image,
                label: label.replace(date, '').replace('/', '').trim(),
                date: date.trim(),
            });
    });
    return results;
}
