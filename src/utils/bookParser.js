const cheerio = require('cheerio')

module.exports = function (htmlStr) {
    let $ = cheerio.load(htmlStr)

    let $name = $('#name')
    let name = $name.find('.sku-name').eq(0).text().trim()
    let author = $name.find('#p-author').text().trim()

    let cover = $('#spec-n1 img').attr('src').trim()

    // let price = $('#page_maprice').text().trim().replace('￥', '');

    let $params = $('#parameter2 li')
    let publishing = $params.eq(0).find('a').text().trim()
    let isbn = $params.eq(1).text().trim().replace('ISBN：', '')

    let publishTime = $('#parameter2 li[title*="-"]').text().trim().replace('出版时间：', '')

    return {
        name,
        author,
        cover,
        // price,
        publishing,
        publishTime,
        isbn
    }
}
