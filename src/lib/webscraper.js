const puppeteer = require('puppeteer');

const scraper = async (url, pageFunction) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);

    const result = await page.evaluate(pageFunction);

    browser.close();

    return result;
}

module.exports = scraper;