const { chromium } = require('playwright');
 
const users = require('../data/data_CxP'); // ✅ Fix #1: corregido typo "daata" → "data"
 
const LoginPage = require('../pages/loginPage');
 
const CrearCxP = require('../pages/CrearCxP');
 
 
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
            datos.password, 
        );
 
        const CrearCxPInstance = new CrearCxP(page);
        await CrearCxPInstance.crear_CxP(datos);
 
    } catch (error) {
 
        console.error('ERROR:', error);
 
    }
 
})();