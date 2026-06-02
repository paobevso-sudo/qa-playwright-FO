const { chromium } = require('playwright');

(async () => {

    const browser = await chromium.launch({
        headless: false
    });

    const context = await browser.newContext();

    const page = await context.newPage();

    await page.goto(
        'https://www.linkedin.com/login/es?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin'
    );

    // capturar popup
    const [popup] = await Promise.all([

        page.waitForEvent('popup'),

        page.getByRole('button', {
            name: /continue with google/i
        }).click()

    ]);

    // esperar carga
    await popup.waitForLoadState();

    // escribir correo
    await popup.fill(
        '#identifierId',
        'Pao.Bev.So@gmail.com'
    );

    // click siguiente
    await popup.getByRole('button', {
        name: /siguiente|next/i
    }).click();

    // volver a intentar
    await popup.getByRole('link', {
        name: /volver a intentar/i
    }).click();

})();