const { chromium } = require('playwright');

const users = require('../data/users');
const LoginPage = require('../pages/loginPage');
const AproComit_Peru = require('../pages/AproComit_Peru');
const Aprobacion = require('../pages/Aprobacion');
const pais = 'peru';
const numOp = 145850;
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
        const aproComit_Peru = new AproComit_Peru(page);
        await aproComit_Peru.aprobar(datos, numOp, comentApr);

        // 🔄 Refresh antes de visación
         await page.reload({ waitUntil: 'networkidle' });
        //Aprobacion visación
        const aprobacionVisacion = new Aprobacion(page);
        await aprobacionVisacion.aprobar(datos, numOp, comentApr);
        // 🔄 Refresh antes de visación
         await page.reload({ waitUntil: 'networkidle' }); 
        //Aprbacion VBOperacines
        const aprobacionVBOperaciones = new Aprobacion(page);
        await aprobacionVBOperaciones.aprobar(datos, numOp, comentApr);
        

    } catch (error) {
        console.error('Error en la prueba:', error);

    } finally {
        if (browser) await browser.close();
    }

})();