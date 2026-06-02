const { chromium } = require('playwright');

(async () => {

    // Abrir Microsoft Edge
    const browser = await chromium.launch({
        headless: false,
        channel: 'msedge'
    });

    // Crear contexto
    const context = await browser.newContext();

    // Nueva página
    const page = await context.newPage();

    // Ir al sitio
    await page.goto('https://puente.faast.cl/');

    // Escribir usuario
    await page.fill('#usuario', 'daniel.carrasco@faast.cl');

    // Escribir contraseña
    await page.fill('#password', 'faast123');

    // Esperar 5 segundos
    await page.waitForTimeout(5000);

    // Cerrar navegador
    // await browser.close();

})();