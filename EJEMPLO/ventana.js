const {chromium} = require ('playwright');
(async() =>  {
    const browser = await chromium.launch({headless:false});
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.linkedin.com/login/es?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin');

// SLECIONAR CAMPO DE BUSQUEDA Y ENVIAR UN TEXTO
await page.getByRole('button', {name: 'Continue with Google'}).click();
const [popup] = await Promise.all([
        page.waitForEvent('popup'),

        page.getByRole('button', {
            name: /continue with google/i
        }).click()
    ]);

    // esperar que cargue
    await popup.waitForLoadState();

    // escribir correo en la NUEVA ventana
    await popup.fill('#identifierId', 'Pao.Bev.So@gmail.com');
await popup.getByRole('button', {name: 'siguiente'}).click();    
//click en olver a intentar
await popup.getByRole('link', {name: /volver a intentar'/i }).click();
})();
