const { chromium } = require('playwright');

const users = require('../data/users');

const LoginPage = require('../pages/loginPage');

const numOp = 145816;
const comentApr= 'Aprobación en comite';

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
        const pais = 'peru';

        // Datos del país
        const datos = users[pais];

        console.log(datos);

        // Login
        await loginPage.login(
            datos.url,
            datos.usuario,
            datos.password
        );
        //aprobación desde Cursatura
        // Navegación al detalle operación
        await page.goto(
            `${datos.url}Factoring/Cursatura/Detalle/${numOp}#/`,
            {
                waitUntil: 'commit',
                timeout: 30000
            }
        );

        // Esperar que aparezca toolbar
        await page.waitForSelector('#stickyToolbar');

        // Click en doble check
        await page.click(
            '#stickyToolbar > li:nth-child(5) > a > img'
        );
        console.log('Doble chec realizado');
        // Esperar que aparezca modal
        await page.getByRole('button', { name: 'Cerrar'}).waitFor();
        // Click en cerrar
        await page.getByRole('button', {name: 'Cerrar'}).click();
        //Agregar comentario
        await page.fill('#txtComentarioOperacion', comentApr);
       // Click en botón Grabar
       await page.getByRole('button', {name: 'Grabar'}).click();
       console.log('Comentario agregado');
      //Clic en Ok
       await page.getByRole('button', { name: 'OK'}).click();
       console.log('Aprobación en comite realizada');
    // Espera opcional
        await page.waitForTimeout(3000);

    } catch (error) {

        console.error('ERROR:', error);

    }

})();