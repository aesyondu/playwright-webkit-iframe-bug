const playwright = require("playwright-core");

(async function () {
    // const browserType = "chromium"
    const browserType = "webkit"

    // await playwright[browserType].downloadBrowserIfNeeded()
    const browser = await playwright[browserType].launch({
        // headless: false
        headless: true
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('http://localhost:8000');
    await page.click("button")

    const mainFrame = page.mainFrame()
    const childFrame = mainFrame.childFrames()[0]

    await page.screenshot({
        path: "1before.png",
        fullPage: true,
    })

    await childFrame.waitForSelector("input[type='number']")
    const myinput = await childFrame.$("input[type='number']")
    await myinput.type("123123123")

    await page.screenshot({
        path: "2after.png",
        fullPage: true,
    })

    // await browser.close();
})();
