const { chromium } = require('playwright');

(async () => {

    // Abrir Microsoft Edge
    const browser = await chromium.launch({
        headless: false,
        channel: 'msedge'
    });

    // Contexto 1 - Google
    const googleContext = await browser.newContext();

    const googlePage = await googleContext.newPage();

    await googlePage.goto('https://puente.faast.cl/');

   // Escribir usuario
    await googlePage.fill('#usuario', 'daniel.carrasco@faast.cl');

    await googlePage.waitForTimeout(5000);
    await googlePage.fill('#password', 'faast123');

})();