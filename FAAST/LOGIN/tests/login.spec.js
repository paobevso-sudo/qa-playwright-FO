const { chromium } = require('playwright');

const users = require('../data/users');

const LoginPage = require('../pages/loginPage');

(async () => {

    try {

        const browser = await chromium.launch({
            headless: false,
            channel: 'msedge'
        });

        const context = await browser.newContext();

        const page = await context.newPage();

        const loginPage = new LoginPage(page);

        // País
        const pais = 'chile';

        // Datos del país
        const datos = users[pais];

        console.log(datos);

        // Login
        await loginPage.login(
            datos.url,
            datos.usuario,
            datos.password
        );

    } catch (error) {

        console.error('ERROR:', error);

    }

})();