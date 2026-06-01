const { chromium } = require('playwright');

const users = require('../data/users');
const LoginPage = require('../pages/loginPage');
const AproComit_Chile = require('../pages/AproComit_Chile');

const numOp = 	3366;
const comentApr = 'Aprobación en comite';

(async () => {

    let browser;

    try {

        browser = await chromium.launch({
            headless: false,
            channel: 'msedge'
        });

        const context = await browser.newContext({
            ignoreHTTPSErrors: true
        });

        const page = await context.newPage();

        // País
        const pais = 'chile';

        // Datos del país
        const datos = users[pais];
        console.log(datos);

        // Login
        const loginPage = new LoginPage(page);
        await loginPage.login(
            datos.url,
            datos.usuario,
            datos.password
        );

        // Aprobación en comité
        const aproComit_Chile = new AproComit_Chile(page);
        await aproComit_Chile.aprobar(datos, numOp, comentApr);

    } catch (error) {
        console.error('Error en la prueba:', error);

    } finally {
        if (browser) await browser.close();
    }

})();