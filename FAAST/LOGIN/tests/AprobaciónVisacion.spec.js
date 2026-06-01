const { chromium } = require('playwright');

const users = require('../data/users');

const LoginPage = require('../pages/loginPage');

const numOp = 	3330;
const comentApr = 'Aprobación en comité';

(async () => {

    try {

        const browser = await chromium.launch({
            headless: false,
            channel: 'msedge'
        });

        const context = await browser.newContext({
            ignoreHTTPSErrors: true
        });

        const page = await context.newPage();

        const loginPage = new LoginPage(page);

        // País
        const pais = 'chile';

        // Datos
        const datos = users[pais];

        console.log(datos);

        // Login
        await loginPage.login(
            datos.url,
            datos.usuario,
            datos.password
        );

        // Navegar al detalle operación
        await page.goto(
       `${datos.url}Factoring/Cursatura/Detalle/${numOp}#/`);
        console.log('Navegación a detalle operación realizada');
        // Esperar botón engranaje
        await page.locator('a.btn.btn-icon').first().waitFor();
        // Click engranaje
        await page.locator('a.btn.btn-icon').first().click();

        console.log('Clic en tuerca realizado');
        //Aprobar
        await page.getByRole('button', {    name: 'Aprobar'}).waitFor();
        await page.getByRole('button', {   name: 'Aprobar'}).click();
        console.log('Clic en aprobar realizado');

        // Click en cerrar
        await page.getByRole('button', {
            name: 'Cerrar'
        }).click();

        // Esperar popup OK
        await page.getByRole('button', {
            name: 'OK'
        }).waitFor();

        // Click OK
        await page.getByRole('button', {
            name: 'OK'
        }).click();
          console.log('Clic en primer OK realizado');
        // Esperar segundo popup OK
        await page.getByRole('button', {
            name: 'OK'
        }).waitFor();

        // Click segundo OK
        //await page.getByRole('button', {
           // name: 'OK'
       // }).click();
        // console.log('Clic en primer OK realizado');
        // Agregar comentario
        await page.fill(
            '#txtComentarioOperacion',
            comentApr
        );

        // Click Grabar
        await page.getByRole('button', {
            name: 'Grabar'
        }).click();

        console.log('Comentario agregado');

        // Espera opcional
        await page.waitForTimeout(3000);

    } catch (error) {

        console.error('ERROR:', error);

    }

})();